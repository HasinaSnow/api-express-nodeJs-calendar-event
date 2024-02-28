import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    isEmail,
    isPhoneNumber,
  } from "class-validator";
  
  export function IsEmailOrPhoneNumber(
    property: string,
    validationOptions?: ValidationOptions
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: "IsEmailOrPhoneNumber",
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          async validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            return isEmail(value) || isPhoneNumber(value, 'MG')
          },
        },
      });
    };
  }
  