## model 
- datas:
  - id, name, infos(private)
- refs hasMany:
  - IdBudget, IdIncome(revenu), IdExpense(dépense), IdTransaction
- refs many :
  - idService

## service
- create(field)
- getAll(paginate: number, filter?: date) => 
- getOne(id: string)
- updateOne(id: string)
- deleteOne(id: string)

- updateMany(refs: string[], field: object)
- deleteMany(refs: string[])
