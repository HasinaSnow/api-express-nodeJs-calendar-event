import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
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

          return (await db.collection(property).doc(value).get()).exists

        },
      },
    });
  };
}
