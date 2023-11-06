/* eslint-disable @typescript-eslint/no-empty-interface */
import { QuestionsRepository } from '../repositories/questions-repository'

interface IDeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
