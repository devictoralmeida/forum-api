/* eslint-disable @typescript-eslint/no-empty-interface */
import { AnswersRepository } from '../repositories/answers-repository'

interface IDeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
