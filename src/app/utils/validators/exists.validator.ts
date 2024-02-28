import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmail,
} from "class-validator";
import { db } from "../../config/firestore";

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
          } else {
            data = (await db.collection(property).doc(value).get())
            result = data.exists
          }
          // console.log(`___Data ${property}_${value}___ `, result)
          return result

        },
      },
    });
  };
}
