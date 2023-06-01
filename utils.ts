export const bypassGuard = <Type>(x: any): x is Type => true;
export const isDefined = <Type>(x: Type | undefined): x is Type => x != undefined;
