/* eslint-disable @typescript-eslint/no-empty-interface */
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface IEditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface IEditQuestionUseCaseRequest {
  question: Question
}

interface IEditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
