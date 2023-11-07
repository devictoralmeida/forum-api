import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let editAnswerUseCase: EditAnswerUseCase;

describe("Edit Answer By Id Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    editAnswerUseCase = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("Should be able to edit a answer by id with correct author ID", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await editAnswerUseCase.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-1",
      content: "Conteúdo teste",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Conteúdo teste",
    });
  });

  it("Should NOT be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await editAnswerUseCase.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-2",
      content: "Conteúdo teste",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
