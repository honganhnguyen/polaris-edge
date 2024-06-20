export default interface TimeZone {
  id: string;
  name: string;
  abbrev: string;
  isDst?: boolean;
  utcOffset: string;
}
