/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

export interface IQuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<IQuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    // Criando uma propriedade que ainda não existe.
    return dayjs().diff(this.props.createdAt, 'days') <= 3
  }

  get excerpt() {
    // Essa prorpiedade vai fornecer um resumo da resposta em 120 caracteres
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch() // Atualizando o updated At
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title) // Se atualizar o título, o slug também é att automaticamente.
    this.touch() // Atualizando o updated At
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch() // Atualizando o updated At
  }

  static create(
    // Esse método static fará o papel de um construtor
    props: Optional<IQuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question( // Passa as props e o id que é oq a classe base recebe no construtor.
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
