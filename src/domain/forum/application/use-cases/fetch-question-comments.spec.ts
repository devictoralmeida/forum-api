import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let fetchQuestionCommentsUseCase: FetchQuestionCommentsUseCase

describe('Fetch Question Comments Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    fetchQuestionCommentsUseCase = new FetchQuestionCommentsUseCase(
      inMemoryQuestionCommentsRepository,
    )
  })

  it('Should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const { questionComments } = await fetchQuestionCommentsUseCase.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('Should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 24; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const { questionComments } = await fetchQuestionCommentsUseCase.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(4)
  })
})