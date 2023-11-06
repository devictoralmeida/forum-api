import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  // Usando o generics do TS para termos intelissence
  private _id: UniqueEntityID // Private pq não quero que nenhum outro arquivo da aplicação possa alterar o id da entidade.
  protected props: Props // única propriedade que mantém uma referência de todos os campos da entidade

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }
}
