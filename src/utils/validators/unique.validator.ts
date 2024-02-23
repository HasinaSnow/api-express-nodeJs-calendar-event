import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from "class-validator";
  import { db } from "../../config/firestore";

  export function IsUnique(
    property: string,
    validationOptions?: ValidationOptions
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: "IsUnique",
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          async validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            if(!value) return false
            const id = await db.collection(property).where(propertyName, '==', value).get()
            return !id.empty
  
          },
        },
      });
    };
  }
  