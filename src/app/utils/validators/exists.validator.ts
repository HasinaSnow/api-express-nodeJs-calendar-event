import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmail,
  isArray,
} from "class-validator";
import { db } from "../../config/firebaseConfig";

export function ExistIn(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "ExistIn",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let result = undefined
          let data = undefined

          if(isEmail(value)) {

            data = (await db.collection(property).where('email', '==', value).get())
            result = !data.empty

          } else if(isArray(value)) {

            if(value.length == 0) return false
            const set = new Set<string>();
            for (const v of value)
              set.add(v) // eliminer les doublons

              console.log('___set___', set)

            const values = Array.from(set) // tableau de valeur sans doublons
            for (let i = 0; i < values.length; i++) {
              const data = (await db.collection(property).doc(values[i]).get())
              if(!data.exists) return false
            }
            result = true

          } else {

            data = (await db.collection(property).doc(value).get())
            result = data.exists

          }
          return result
        },
      },
    });
  };
}
