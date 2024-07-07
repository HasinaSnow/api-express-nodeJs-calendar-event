## model 
- datas:
  => id<string>, date<date>, infos<string>
- refs hasOne:
  => IdClient<string>, IdCateg<string>, IdPlaceId<string>, IdAudience<public|private|meOnly>, IdStatus<confirmed|pending|cancelled>
- refs hasMany:
  => IdBudget<string>, IdIncome(revenu)<string>, IdExpense(dépense)<string>, IdTransaction<string>
- refs many :
  => idServices<string[]>

## controller (verification auth)
- constructor(userService, permissionService)

- index()
  - params: paginate, dateStart, dateEnd, date, idServices[], IdAudiences[]
  - permission.toIndex()
  - idServices[] = userService.getServices(IdUser)
  - idRoles[] = userService.getRoles(IdUser)
  - query
    - ADMIN|EVENT_MANAGER: eventService.getAll(paginate?, filter?: { idServices[]?, dateStart?, dateEnd?, date?})
    - simple_user_in_services: eventService.getAll(paginate?, filter: { idServices[...user_service], IdAudiences[public], dateStart?, dateEnd?, date?})
  - DTO: 
    - ADMIN|EVENT_MANAGER: 

- create()
  - body: date, infos?, IdClient, IdCateg, IdPlaceId, IdAudiency, IdStatus, idServices[]
  - data save
    - eventService.create(fields<date,infos,IdClient,IdPlace,IdAudiency,IdStatus,idServices[]>)

- update()
  - body: date, infos?, clientId, IdCateg, IdPlaceId, IdAudiency, IdStatus
  - data update
    - eventService.update(fields<date?,infos?,IdClient?,IdPlace?,IdAudiency?,IdStatus?>)

- addServices()
  - body: IdServices[]
  - data add
    - eventService.addSevices(IdServices[])

- removeServices()
  - body: IdServices[]
  - data remove
    - eventService.removeServices(IdEvent, IdServices[])

## service
- getAll(paginate?: number, filter?: { idServices[], dateStart, dateEnd, date})

- create(fields)
  - runTransaction {
    - eventModel.save()
    - idServices.forEach(service => eventServiceModel.save()) // use batch method
  }

- update(id, fields)
    - eventModel.update(fields)

- addServices(idEvent, idServices[])
  - runTransaction {
    - idServices.forEach(service => eventServiceModel.addService(service)) // use batch method
  }

- removeServices(idEvent, idServices[])
  - runTransaction {
    - idServices.forEach(service => eventServiceModel.remove(service)) // use batch method
  }

- delete(idEvents[])
  - runTransaction {
    - idEvents.forEach(event => eventModel.delete(event)) // use batch method
    - idEvents.forEach(event => eventServiceModel.remove(event)) // use batch method
  }

- getOne(id: string)
  - private:
- updateOne(id: string)
- deleteOne(id: string)

- deleteMany(refs: string[])
