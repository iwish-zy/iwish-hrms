declare module "solarlunar" {
  export interface SolarLunarResult {
    cYear: number
    cMonth: number
    cDay: number
    isLeap: boolean
    [key: string]: any
  }

  const solarLunar: {
    lunar2solar(year: number, month: number, day: number, isLeapMonth?: boolean): SolarLunarResult | -1
    solar2lunar(year?: number, month?: number, day?: number): SolarLunarResult | -1
  }

  export default solarLunar
}
