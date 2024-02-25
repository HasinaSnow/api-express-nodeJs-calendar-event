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
          const field = isEmail(value) ? 'email' : 'phone'
          const data = await db.collection(property).where(field, '==', value).get()
          return !data.empty

        },
      },
    });
  };
}
