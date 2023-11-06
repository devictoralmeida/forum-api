import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Create Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to create an answer', async () => {
    const { answer } = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da pergunta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
