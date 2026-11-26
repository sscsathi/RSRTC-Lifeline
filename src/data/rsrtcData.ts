export type BusCategory =
  | 'Ordinary'
  | 'Express'
  | 'Deluxe'
  | 'Super Deluxe'
  | 'Super Luxury Volvo'
  | 'AC Sleeper';

export type BusFilterOption =
  | 'All'
  | 'Ordinary'
  | 'Express'
  | 'Deluxe'
  | 'Volvo AC'
  | 'Sleeper';

export interface CityHub {
  id: string;
  name: string;
  code: string;
  stand: string;
  depot: string;
  district: string;
  region: 'East' | 'North' | 'Central' | 'West' | 'South' | 'Southeast';
  state: string;
  lat: number;
  lng: number;
}

export interface RawDatasetRoute {
  id: string;
  from: string;
  to: string;
  via: string;
  departure: string;
  arrival: string;
  duration: string;
  type: string;
  depot: string;
}

export interface RouteStop {
  stopName: string;
  stand: string;
  arrivalTime: string;
  departureTime: string;
  haltMins: number;
  distanceKm: number;
  platform?: string;
}

export interface BusService {
  id: string;
  busNumber: string;
  serviceCode: string;
  depotName: string;
  category: BusCategory;
  filterKey: Exclude<BusFilterOption, 'All'>;
  fromCity: CityHub;
  toCity: CityHub;
  viaText: string;
  isDirectDataset: boolean;
  isConnecting: boolean;
  departureTime: string;
  arrivalTime: string;
  departureMins: number;
  durationMinutes: number;
  durationLabel: string;
  distanceKm: number;
  boardingPoint: string;
  droppingPoint: string;
  amenities: string[];
  stops: RouteStop[];
  onTimePercent: number;
}

export interface PopularRoute {
  id: string;
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  dailyBuses: number;
  avgDuration: string;
  highlight: string;
}

export interface RecentSearch {
  id: string;
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  dateIso: string;
  busFilter: BusFilterOption;
  searchedAt: string;
}

export interface HeritageBanner {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageUrl: string;
  actionFromId: string;
  actionToId: string;
  actionFilter: BusFilterOption;
}

export const RSRTC_HELPLINES = {
  tollFree: '1800-2000-103',
  centralEnquiryJaipur: '0141-2373044',
  emergency: '112',
  highwayHelpline: '1033',
} as const;

export const STATION_NAMES: string[] = [
  'Ajmer',
  'Alwar',
  'Anupgarh',
  'Balotra',
  'Banswara',
  'Baran',
  'Barmer',
  'Beawar',
  'Bharatpur',
  'Bhilwara',
  'Bikaner',
  'Bundi',
  'Chittorgarh',
  'Churu',
  'Dausa',
  'Deeg',
  'Dholpur',
  'Didwana-Kuchaman',
  'Dudu',
  'Dungarpur',
  'Gangapur City',
  'Hanumangarh',
  'Jaipur (Sindhi Camp)',
  'Jaipur Rural',
  'Jaisalmer',
  'Jalore',
  'Jhalawar',
  'Jhunjhunu',
  'Jodhpur',
  'Jodhpur Rural',
  'Karauli',
  'Kekri',
  'Khairthal-Tijara',
  'Kota',
  'Kotputli-Behror',
  'Nagaur',
  'Neem Ka Thana',
  'Pali',
  'Phalodi',
  'Pratapgarh',
  'Rajsamand',
  'Salumber',
  'Sanchore',
  'Sawai Madhopur',
  'Shahpura',
  'Sikar',
  'Sirohi',
  'Sri Ganganagar',
  'Tonk',
  'Udaipur',
];

export function stationToId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const STATION_META: Record<
  string,
  {
    code: string;
    stand: string;
    depot: string;
    region: CityHub['region'];
    lat: number;
    lng: number;
  }
> = {
  Ajmer: { code: 'AJM', stand: 'Ajmer Central Bus Stand', depot: 'Ajmer Depot', region: 'Central', lat: 26.462, lng: 74.639 },
  Alwar: { code: 'ALW', stand: 'Alwar Central Bus Stand', depot: 'Alwar Depot', region: 'East', lat: 27.553, lng: 76.634 },
  Anupgarh: { code: 'ANG', stand: 'Anupgarh Bus Stand', depot: 'Anupgarh Depot', region: 'North', lat: 29.191, lng: 73.209 },
  Balotra: { code: 'BLT', stand: 'Balotra Central Bus Stand', depot: 'Balotra Depot', region: 'West', lat: 25.831, lng: 72.243 },
  Banswara: { code: 'BSW', stand: 'Banswara Roadways Bus Stand', depot: 'Banswara Depot', region: 'South', lat: 23.546, lng: 74.435 },
  Baran: { code: 'BRN', stand: 'Baran Central Bus Stand', depot: 'Baran Depot', region: 'Southeast', lat: 25.101, lng: 76.513 },
  Barmer: { code: 'BMR', stand: 'Barmer Central Bus Stand', depot: 'Barmer Depot', region: 'West', lat: 25.752, lng: 71.396 },
  Beawar: { code: 'BWR', stand: 'Beawar Central Bus Stand', depot: 'Beawar Depot', region: 'Central', lat: 26.101, lng: 74.319 },
  Bharatpur: { code: 'BTP', stand: 'Heera Das Bus Stand', depot: 'Bharatpur Depot', region: 'East', lat: 27.215, lng: 77.49 },
  Bhilwara: { code: 'BHL', stand: 'Bhilwara Central Bus Stand', depot: 'Bhilwara Depot', region: 'Central', lat: 25.347, lng: 74.64 },
  Bikaner: { code: 'BKN', stand: 'Bikaner Central Bus Stand', depot: 'Bikaner Depot', region: 'North', lat: 28.022, lng: 73.311 },
  Bundi: { code: 'BND', stand: 'Bundi Roadways Bus Stand', depot: 'Bundi Depot', region: 'Southeast', lat: 25.43, lng: 75.649 },
  Chittorgarh: { code: 'CTG', stand: 'Chittorgarh Central Bus Stand', depot: 'Chittorgarh Depot', region: 'South', lat: 24.888, lng: 74.626 },
  Churu: { code: 'CHR', stand: 'Churu Central Bus Stand', depot: 'Churu Depot', region: 'North', lat: 28.292, lng: 74.964 },
  Dausa: { code: 'DSA', stand: 'Dausa Roadways Bus Stand', depot: 'Dausa Depot', region: 'East', lat: 26.892, lng: 76.336 },
  Deeg: { code: 'DEG', stand: 'Deeg Central Bus Stand', depot: 'Deeg Depot', region: 'East', lat: 27.472, lng: 77.326 },
  Dholpur: { code: 'DLP', stand: 'Dholpur Central Bus Stand', depot: 'Dholpur Depot', region: 'East', lat: 26.702, lng: 77.893 },
  'Didwana-Kuchaman': { code: 'DDW', stand: 'Didwana-Kuchaman Bus Stand', depot: 'Didwana Depot', region: 'Central', lat: 27.397, lng: 74.573 },
  Dudu: { code: 'DDU', stand: 'Dudu Highway Bus Stand', depot: 'Ajmer Depot', region: 'Central', lat: 26.682, lng: 75.235 },
  Dungarpur: { code: 'DGP', stand: 'Dungarpur Central Bus Stand', depot: 'Dungarpur Depot', region: 'South', lat: 23.843, lng: 73.714 },
  'Gangapur City': { code: 'GGC', stand: 'Gangapur City Bus Stand', depot: 'Gangapur City Depot', region: 'East', lat: 26.473, lng: 76.724 },
  Hanumangarh: { code: 'HMG', stand: 'Hanumangarh Junction Bus Stand', depot: 'Hanumangarh Depot', region: 'North', lat: 29.581, lng: 74.329 },
  'Jaipur (Sindhi Camp)': { code: 'JPR', stand: 'Sindhi Camp Central Bus Stand', depot: 'Jaipur Vaishali Nagar Depot', region: 'Central', lat: 26.922, lng: 75.798 },
  'Jaipur Rural': { code: 'JPRR', stand: 'Chomu / Shahpura Rural Terminal', depot: 'Jaipur Depot', region: 'Central', lat: 27.159, lng: 75.721 },
  Jaisalmer: { code: 'JSM', stand: 'Jaisalmer Golden City Bus Stand', depot: 'Jaisalmer Depot', region: 'West', lat: 26.915, lng: 70.908 },
  Jalore: { code: 'JLR', stand: 'Jalore Central Bus Stand', depot: 'Jalore Depot', region: 'West', lat: 25.345, lng: 72.615 },
  Jhalawar: { code: 'JLW', stand: 'Jhalawar Roadways Bus Stand', depot: 'Jhalawar Depot', region: 'Southeast', lat: 24.597, lng: 76.161 },
  Jhunjhunu: { code: 'JJN', stand: 'Jhunjhunu Central Bus Stand', depot: 'Jhunjhunu Depot', region: 'North', lat: 28.128, lng: 75.399 },
  Jodhpur: { code: 'JDH', stand: 'Rai Ka Bagh Central Bus Stand', depot: 'Jodhpur Depot', region: 'West', lat: 26.292, lng: 73.035 },
  'Jodhpur Rural': { code: 'JDHR', stand: 'Bilara / Osian Rural Stand', depot: 'Jodhpur Depot', region: 'West', lat: 26.385, lng: 73.18 },
  Karauli: { code: 'KRL', stand: 'Karauli Central Bus Stand', depot: 'Karauli Depot', region: 'East', lat: 26.498, lng: 77.02 },
  Kekri: { code: 'KKR', stand: 'Kekri Roadways Bus Stand', depot: 'Ajmer Depot', region: 'Central', lat: 25.972, lng: 75.151 },
  'Khairthal-Tijara': { code: 'KHT', stand: 'Khairthal-Tijara Bus Stand', depot: 'Tijara Depot', region: 'East', lat: 27.804, lng: 76.64 },
  Kota: { code: 'KOT', stand: 'Nayapura Central Bus Stand', depot: 'Kota Depot', region: 'Southeast', lat: 25.182, lng: 75.864 },
  'Kotputli-Behror': { code: 'KTP', stand: 'Kotputli NH-48 Bus Stand', depot: 'Kotputli Depot', region: 'East', lat: 27.703, lng: 76.199 },
  Nagaur: { code: 'NGR', stand: 'Nagaur Central Bus Stand', depot: 'Nagaur Depot', region: 'Central', lat: 27.202, lng: 73.733 },
  'Neem Ka Thana': { code: 'NKT', stand: 'Neem Ka Thana Bus Stand', depot: 'Neem Ka Thana Depot', region: 'North', lat: 27.738, lng: 75.783 },
  Pali: { code: 'PLI', stand: 'Pali Central Bus Stand', depot: 'Pali Depot', region: 'West', lat: 25.771, lng: 73.323 },
  Phalodi: { code: 'PHL', stand: 'Phalodi Roadways Bus Stand', depot: 'Phalodi Depot', region: 'West', lat: 27.131, lng: 72.368 },
  Pratapgarh: { code: 'PTG', stand: 'Pratapgarh Central Bus Stand', depot: 'Pratapgarh Depot', region: 'South', lat: 24.032, lng: 74.781 },
  Rajsamand: { code: 'RSM', stand: 'Rajsamand (Kankroli) Bus Stand', depot: 'Rajsamand Depot', region: 'South', lat: 25.067, lng: 73.883 },
  Salumber: { code: 'SLB', stand: 'Salumber Roadways Bus Stand', depot: 'Udaipur Depot', region: 'South', lat: 24.135, lng: 74.045 },
  Sanchore: { code: 'SNC', stand: 'Sanchore Highway Bus Stand', depot: 'Sanchore Depot', region: 'West', lat: 24.755, lng: 71.772 },
  'Sawai Madhopur': { code: 'SWM', stand: 'Sawai Madhopur Bus Stand', depot: 'Sawai Madhopur Depot', region: 'East', lat: 26.012, lng: 76.356 },
  Shahpura: { code: 'SHP', stand: 'Shahpura Roadways Bus Stand', depot: 'Shahpura Depot', region: 'Central', lat: 25.622, lng: 74.926 },
  Sikar: { code: 'SKR', stand: 'Sikar Central Bus Stand', depot: 'Sikar Depot', region: 'North', lat: 27.609, lng: 75.139 },
  Sirohi: { code: 'SRH', stand: 'Sirohi Central Bus Stand', depot: 'Sirohi Depot', region: 'West', lat: 24.882, lng: 72.858 },
  'Sri Ganganagar': { code: 'SGN', stand: 'Sri Ganganagar Central Bus Stand', depot: 'Sri Ganganagar Depot', region: 'North', lat: 29.909, lng: 73.877 },
  Tonk: { code: 'TNK', stand: 'Tonk Roadways Bus Stand', depot: 'Tonk Depot', region: 'Southeast', lat: 26.166, lng: 75.788 },
  Udaipur: { code: 'UDR', stand: 'Udiapole Central Bus Stand', depot: 'Udaipur Depot', region: 'South', lat: 24.576, lng: 73.694 },
};

export const CITY_HUBS: CityHub[] = STATION_NAMES.map((name) => {
  const m = STATION_META[name];
  return {
    id: stationToId(name),
    name,
    code: m?.code ?? name.slice(0, 3).toUpperCase(),
    stand: m?.stand ?? `${name} Central Bus Stand`,
    depot: m?.depot ?? `${name} Depot`,
    district: name.replace(/\s*\(.*?\)\s*/g, ''),
    region: m?.region ?? 'Central',
    state: 'Rajasthan',
    lat: m?.lat ?? 26.9,
    lng: m?.lng ?? 75.8,
  };
});

export const RSRTC_ROUTES: RawDatasetRoute[] = [
  { id: 'RSRTC-01', from: 'Deeg', to: 'Jaipur (Sindhi Camp)', via: 'Nagar - Mahwa - Dausa', departure: '06:30 AM', arrival: '11:00 AM', duration: '4h 30m', type: 'Express', depot: 'Deeg Depot' },
  { id: 'RSRTC-02', from: 'Jaipur (Sindhi Camp)', to: 'Deeg', via: 'Dausa - Mahwa - Nagar', departure: '02:15 PM', arrival: '06:45 PM', duration: '4h 30m', type: 'Express', depot: 'Deeg Depot' },
  { id: 'RSRTC-03', from: 'Deeg', to: 'Bharatpur', via: 'Kumher', departure: '07:00 AM', arrival: '08:00 AM', duration: '1h 00m', type: 'Ordinary', depot: 'Deeg Depot' },
  { id: 'RSRTC-04', from: 'Alwar', to: 'Bharatpur', via: 'Nagar - Deeg', departure: '09:00 AM', arrival: '12:00 PM', duration: '3h 00m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-05', from: 'Jaipur (Sindhi Camp)', to: 'Bharatpur', via: 'Dausa - Mahwa', departure: '07:30 AM', arrival: '11:30 AM', duration: '4h 00m', type: 'Super Deluxe', depot: 'Bharatpur Depot' },
  { id: 'RSRTC-06', from: 'Bharatpur', to: 'Dholpur', via: 'Roopwas', departure: '08:30 AM', arrival: '10:45 AM', duration: '2h 15m', type: 'Ordinary', depot: 'Dholpur Depot' },
  { id: 'RSRTC-07', from: 'Jaipur (Sindhi Camp)', to: 'Dausa', via: 'Bassi', departure: '08:00 AM', arrival: '09:30 AM', duration: '1h 30m', type: 'Express', depot: 'Dausa Depot' },
  { id: 'RSRTC-08', from: 'Jaipur (Sindhi Camp)', to: 'Karauli', via: 'Dausa - Lalsot - Gangapur City', departure: '09:30 AM', arrival: '02:00 PM', duration: '4h 30m', type: 'Express', depot: 'Karauli Depot' },
  { id: 'RSRTC-09', from: 'Jaipur (Sindhi Camp)', to: 'Gangapur City', via: 'Dausa - Lalsot', departure: '10:15 AM', arrival: '01:45 PM', duration: '3h 30m', type: 'Express', depot: 'Gangapur City Depot' },
  { id: 'RSRTC-10', from: 'Jaipur (Sindhi Camp)', to: 'Sawai Madhopur', via: 'Chaksu - Lalsot', departure: '08:00 AM', arrival: '11:45 AM', duration: '3h 45m', type: 'Express', depot: 'Sawai Madhopur Depot' },
  { id: 'RSRTC-11', from: 'Jaipur (Sindhi Camp)', to: 'Alwar', via: 'Shahpura - Thanagazi', departure: '07:45 AM', arrival: '11:15 AM', duration: '3h 30m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-12', from: 'Alwar', to: 'Khairthal-Tijara', via: 'Kishangarh Bas', departure: '08:30 AM', arrival: '09:45 AM', duration: '1h 15m', type: 'Ordinary', depot: 'Tijara Depot' },
  { id: 'RSRTC-13', from: 'Jaipur (Sindhi Camp)', to: 'Kotputli-Behror', via: 'Chomu - Shahpura', departure: '07:00 AM', arrival: '09:30 AM', duration: '2h 30m', type: 'Express', depot: 'Kotputli Depot' },
  { id: 'RSRTC-14', from: 'Jaipur (Sindhi Camp)', to: 'Neem Ka Thana', via: 'Shahpura - Ajitgarh', departure: '08:15 AM', arrival: '11:00 AM', duration: '2h 45m', type: 'Express', depot: 'Neem Ka Thana Depot' },
  { id: 'RSRTC-15', from: 'Jaipur (Sindhi Camp)', to: 'Sikar', via: 'Chomu - Ringas', departure: '09:00 AM', arrival: '11:30 AM', duration: '2h 30m', type: 'Express', depot: 'Sikar Depot' },
  { id: 'RSRTC-16', from: 'Jaipur (Sindhi Camp)', to: 'Jhunjhunu', via: 'Ringas - Sikar - Nawalgarh', departure: '07:15 AM', arrival: '11:30 AM', duration: '4h 15m', type: 'Express', depot: 'Jhunjhunu Depot' },
  { id: 'RSRTC-17', from: 'Jaipur (Sindhi Camp)', to: 'Churu', via: 'Sikar - Fatehpur', departure: '08:45 AM', arrival: '01:15 PM', duration: '4h 30m', type: 'Express', depot: 'Churu Depot' },
  { id: 'RSRTC-18', from: 'Jaipur (Sindhi Camp)', to: 'Didwana-Kuchaman', via: 'Chomu - Renwal - Kuchaman', departure: '07:30 AM', arrival: '11:30 AM', duration: '4h 00m', type: 'Express', depot: 'Didwana Depot' },
  { id: 'RSRTC-19', from: 'Jaipur (Sindhi Camp)', to: 'Nagaur', via: 'Kuchaman - Degana', departure: '08:00 AM', arrival: '01:30 PM', duration: '5h 30m', type: 'Express', depot: 'Nagaur Depot' },
  { id: 'RSRTC-20', from: 'Jaipur (Sindhi Camp)', to: 'Bikaner', via: 'Sikar - Fatehpur - Ratangarh', departure: '07:15 AM', arrival: '01:45 PM', duration: '6h 30m', type: 'Express', depot: 'Bikaner Depot' },
  { id: 'RSRTC-21', from: 'Bikaner', to: 'Anupgarh', via: 'Chhatargarh - Gharsana', departure: '08:00 AM', arrival: '11:45 AM', duration: '3h 45m', type: 'Ordinary', depot: 'Anupgarh Depot' },
  { id: 'RSRTC-22', from: 'Jaipur (Sindhi Camp)', to: 'Sri Ganganagar', via: 'Sikar - Churu - Hanumangarh', departure: '08:30 PM', arrival: '06:30 AM', duration: '10h 00m', type: 'AC Sleeper', depot: 'Sri Ganganagar Depot' },
  { id: 'RSRTC-23', from: 'Hanumangarh', to: 'Bikaner', via: 'Pilibanga - Suratgarh - Mahajan', departure: '07:30 AM', arrival: '12:15 PM', duration: '4h 45m', type: 'Express', depot: 'Hanumangarh Depot' },
  { id: 'RSRTC-24', from: 'Jaipur (Sindhi Camp)', to: 'Dudu', via: 'Bagru', departure: '09:00 AM', arrival: '10:15 AM', duration: '1h 15m', type: 'Ordinary', depot: 'Ajmer Depot' },
  { id: 'RSRTC-25', from: 'Jaipur (Sindhi Camp)', to: 'Ajmer', via: 'Dudu - Kishangarh', departure: '08:30 AM', arrival: '11:00 AM', duration: '2h 30m', type: 'Super Deluxe', depot: 'Ajmer Depot' },
  { id: 'RSRTC-26', from: 'Ajmer', to: 'Kekri', via: 'Nasirabad - Sarwar', departure: '09:30 AM', arrival: '11:30 AM', duration: '2h 00m', type: 'Ordinary', depot: 'Ajmer Depot' },
  { id: 'RSRTC-27', from: 'Jaipur (Sindhi Camp)', to: 'Beawar', via: 'Dudu - Kishangarh - Ajmer', departure: '09:15 AM', arrival: '01:05 PM', duration: '3h 50m', type: 'Express', depot: 'Beawar Depot' },
  { id: 'RSRTC-28', from: 'Ajmer', to: 'Bhilwara', via: 'Nasirabad - Gulabpura', departure: '10:00 AM', arrival: '01:00 PM', duration: '3h 00m', type: 'Express', depot: 'Bhilwara Depot' },
  { id: 'RSRTC-29', from: 'Bhilwara', to: 'Shahpura', via: 'Banera', departure: '11:00 AM', arrival: '12:15 PM', duration: '1h 15m', type: 'Ordinary', depot: 'Shahpura Depot' },
  { id: 'RSRTC-30', from: 'Jaipur (Sindhi Camp)', to: 'Tonk', via: 'Chaksu - Niwai', departure: '08:15 AM', arrival: '10:30 AM', duration: '2h 15m', type: 'Express', depot: 'Tonk Depot' },
  { id: 'RSRTC-31', from: 'Jaipur (Sindhi Camp)', to: 'Bundi', via: 'Tonk - Deoli', departure: '07:30 AM', arrival: '11:45 AM', duration: '4h 15m', type: 'Express', depot: 'Bundi Depot' },
  { id: 'RSRTC-32', from: 'Jaipur (Sindhi Camp)', to: 'Kota', via: 'Tonk - Deoli - Bundi', departure: '06:45 AM', arrival: '11:45 AM', duration: '5h 00m', type: 'Super Deluxe', depot: 'Kota Depot' },
  { id: 'RSRTC-33', from: 'Kota', to: 'Jhalawar', via: 'Darrah', departure: '08:30 AM', arrival: '10:45 AM', duration: '2h 15m', type: 'Express', depot: 'Jhalawar Depot' },
  { id: 'RSRTC-34', from: 'Kota', to: 'Baran', via: 'Antah', departure: '09:15 AM', arrival: '11:00 AM', duration: '1h 45m', type: 'Ordinary', depot: 'Baran Depot' },
  { id: 'RSRTC-35', from: 'Kota', to: 'Chittorgarh', via: 'Bundi - Bijoliya - Bassi', departure: '08:00 AM', arrival: '12:15 PM', duration: '4h 15m', type: 'Express', depot: 'Chittorgarh Depot' },
  { id: 'RSRTC-36', from: 'Chittorgarh', to: 'Pratapgarh', via: 'Nimbahera - Chhoti Sadri', departure: '09:00 AM', arrival: '11:45 AM', duration: '2h 45m', type: 'Express', depot: 'Pratapgarh Depot' },
  { id: 'RSRTC-37', from: 'Jaipur (Sindhi Camp)', to: 'Udaipur', via: 'Ajmer - Bhilwara - Chittorgarh', departure: '09:30 PM', arrival: '05:30 AM', duration: '8h 00m', type: 'AC Sleeper', depot: 'Udaipur Depot' },
  { id: 'RSRTC-38', from: 'Udaipur', to: 'Rajsamand', via: 'Nathdwara', departure: '08:30 AM', arrival: '10:15 AM', duration: '1h 45m', type: 'Express', depot: 'Rajsamand Depot' },
  { id: 'RSRTC-39', from: 'Udaipur', to: 'Salumber', via: 'Jaisamand', departure: '09:15 AM', arrival: '11:15 AM', duration: '2h 00m', type: 'Ordinary', depot: 'Udaipur Depot' },
  { id: 'RSRTC-40', from: 'Udaipur', to: 'Banswara', via: 'Salumber - Aspur', departure: '07:30 AM', arrival: '12:00 PM', duration: '4h 30m', type: 'Express', depot: 'Banswara Depot' },
  { id: 'RSRTC-41', from: 'Udaipur', to: 'Dungarpur', via: 'Rishabhdeo - Kherwara', departure: '09:00 AM', arrival: '12:00 PM', duration: '3h 00m', type: 'Express', depot: 'Dungarpur Depot' },
  { id: 'RSRTC-42', from: 'Jaipur (Sindhi Camp)', to: 'Jodhpur', via: 'Ajmer - Beawar - Pali', departure: '07:00 AM', arrival: '01:50 PM', duration: '6h 50m', type: 'Express', depot: 'Jodhpur Depot' },
  { id: 'RSRTC-43', from: 'Jodhpur', to: 'Pali', via: 'Rohat', departure: '08:00 AM', arrival: '09:45 AM', duration: '1h 45m', type: 'Express', depot: 'Pali Depot' },
  { id: 'RSRTC-44', from: 'Jodhpur', to: 'Sirohi', via: 'Pali - Sumerpur - Sheoganj', departure: '07:15 AM', arrival: '12:00 PM', duration: '4h 45m', type: 'Express', depot: 'Sirohi Depot' },
  { id: 'RSRTC-45', from: 'Jodhpur', to: 'Jalore', via: 'Rohat - Ahore', departure: '08:30 AM', arrival: '11:45 AM', duration: '3h 15m', type: 'Express', depot: 'Jalore Depot' },
  { id: 'RSRTC-46', from: 'Jodhpur', to: 'Sanchore', via: 'Pali - Jalore - Bhinmal', departure: '07:00 AM', arrival: '01:30 PM', duration: '6h 30m', type: 'Express', depot: 'Sanchore Depot' },
  { id: 'RSRTC-47', from: 'Jodhpur', to: 'Balotra', via: 'Kalyanpur - Pachpadra', departure: '09:00 AM', arrival: '11:30 AM', duration: '2h 30m', type: 'Express', depot: 'Balotra Depot' },
  { id: 'RSRTC-48', from: 'Jodhpur', to: 'Barmer', via: 'Balotra - Baytu', departure: '07:30 AM', arrival: '12:30 PM', duration: '5h 00m', type: 'Express', depot: 'Barmer Depot' },
  { id: 'RSRTC-49', from: 'Jodhpur', to: 'Phalodi', via: 'Osian - Lohawat', departure: '08:15 AM', arrival: '11:15 AM', duration: '3h 00m', type: 'Express', depot: 'Phalodi Depot' },
  { id: 'RSRTC-50', from: 'Jodhpur', to: 'Jaisalmer', via: 'Balesar - Pokhran', departure: '07:00 AM', arrival: '12:30 PM', duration: '5h 30m', type: 'Express', depot: 'Jaisalmer Depot' },
];

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: 'jpr-btp',
    fromId: 'jaipur-sindhi-camp',
    toId: 'bharatpur',
    fromName: 'Jaipur (Sindhi Camp)',
    toName: 'Bharatpur',
    dailyBuses: 28,
    avgDuration: '4h 00m',
    highlight: 'Via Dausa - Mahwa',
  },
  {
    id: 'deg-jpr',
    fromId: 'deeg',
    toId: 'jaipur-sindhi-camp',
    fromName: 'Deeg',
    toName: 'Jaipur (Sindhi Camp)',
    dailyBuses: 14,
    avgDuration: '4h 30m',
    highlight: 'Via Nagar - Mahwa - Dausa',
  },
  {
    id: 'jpr-udr',
    fromId: 'jaipur-sindhi-camp',
    toId: 'udaipur',
    fromName: 'Jaipur (Sindhi Camp)',
    toName: 'Udaipur',
    dailyBuses: 22,
    avgDuration: '8h 00m',
    highlight: 'Via Ajmer - Bhilwara - Chittorgarh',
  },
  {
    id: 'jdh-jsm',
    fromId: 'jodhpur',
    toId: 'jaisalmer',
    fromName: 'Jodhpur',
    toName: 'Jaisalmer',
    dailyBuses: 16,
    avgDuration: '5h 30m',
    highlight: 'Via Balesar - Pokhran',
  },
  {
    id: 'jpr-ajm',
    fromId: 'jaipur-sindhi-camp',
    toId: 'ajmer',
    fromName: 'Jaipur (Sindhi Camp)',
    toName: 'Ajmer',
    dailyBuses: 52,
    avgDuration: '2h 30m',
    highlight: 'Via Dudu - Kishangarh',
  },
  {
    id: 'jpr-kot',
    fromId: 'jaipur-sindhi-camp',
    toId: 'kota',
    fromName: 'Jaipur (Sindhi Camp)',
    toName: 'Kota',
    dailyBuses: 24,
    avgDuration: '5h 00m',
    highlight: 'Via Tonk - Deoli - Bundi',
  },
];

export const HERITAGE_BANNERS: HeritageBanner[] = [
  {
    id: 'heritage-connect',
    kicker: 'All 50 Rajasthan Districts · Direct & Connecting Schedules',
    title: 'Connecting Every Corner of Rajasthan',
    subtitle: 'From heritage capitals to your hometown — browse verified timetables across all 50 district depots.',
    ctaLabel: 'Explore Jaipur to Bharatpur',
    imageUrl: '/src/assets/images/rajasthan_heritage_highway_1795665606438.jpg',
    actionFromId: 'jaipur-sindhi-camp',
    actionToId: 'bharatpur',
    actionFilter: 'All',
  },
  {
    id: 'volvo-luxury',
    kicker: 'Super Deluxe & AC Sleeper Fleet',
    title: 'Super Deluxe & Overnight AC Sleeper Buses',
    subtitle: 'Comfortable overnight and intercity highway schedules linking Jaipur, Udaipur, Kota, and Sri Ganganagar.',
    ctaLabel: 'View Jaipur to Sri Ganganagar',
    imageUrl: '/src/assets/images/volvo_luxury_interior_1795665606619.jpg',
    actionFromId: 'jaipur-sindhi-camp',
    actionToId: 'sri-ganganagar',
    actionFilter: 'All',
  },
  {
    id: 'royal-udaipur',
    kicker: 'Royal Rajasthan Heritage Circuit',
    title: 'Direct Heritage Services to the City of Lakes',
    subtitle: 'Daily Express and AC Sleeper coaches linking Jaipur, Ajmer, Bhilwara, Chittorgarh, and Udaipur.',
    ctaLabel: 'Search Jaipur to Udaipur',
    imageUrl: '/src/assets/images/udaipur_heritage_dusk_1795665608238.jpg',
    actionFromId: 'jaipur-sindhi-camp',
    actionToId: 'udaipur',
    actionFilter: 'All',
  },
];

export function findCityById(id: string): CityHub | null {
  if (!id) return null;
  const exact = CITY_HUBS.find((c) => c.id === id);
  if (exact) return exact;
  // Graceful fallback for older saved IDs like 'jaipur'
  if (id === 'jaipur') {
    return CITY_HUBS.find((c) => c.id === 'jaipur-sindhi-camp') ?? null;
  }
  return null;
}

export function getCityById(id: string): CityHub {
  return (
    findCityById(id) ??
    CITY_HUBS.find((c) => c.id === 'jaipur-sindhi-camp') ??
    CITY_HUBS[0]
  );
}

export function calculateRoadDistanceKm(from: CityHub, to: CityHub): number {
  if (from.id === to.id) return 0;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const straightKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(40, Math.round((straightKm * 1.24) / 5) * 5);
}

function parseTime12hToMins(timeStr: string): number {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 8 * 60;
  let hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'AM' && hours === 12) hours = 0;
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  return hours * 60 + mins;
}

function formatMinsTo12h(totalMins: number): string {
  const normalized = ((totalMins % 1440) + 1440) % 1440;
  const h24 = Math.floor(normalized / 60);
  const m = normalized % 60;
  const meridiem = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${meridiem}`;
}

function parseDurationToMins(durationStr: string): number {
  const hMatch = durationStr.match(/(\d+)\s*h/i);
  const mMatch = durationStr.match(/(\d+)\s*m/i);
  const h = hMatch ? parseInt(hMatch[1], 10) : 0;
  const m = mMatch ? parseInt(mMatch[1], 10) : 0;
  return Math.max(45, h * 60 + m);
}

export function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

function deterministicHash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function normalizeCategory(type: string): {
  category: BusCategory;
  filterKey: Exclude<BusFilterOption, 'All'>;
  amenities: string[];
} {
  const lower = type.toLowerCase();
  if (lower.includes('volvo')) {
    return {
      category: 'Super Luxury Volvo',
      filterKey: 'Volvo AC',
      amenities: ['Daily Service', 'Multi-Axle AC'],
    };
  }
  if (lower.includes('sleeper')) {
    return {
      category: 'AC Sleeper',
      filterKey: 'Sleeper',
      amenities: ['Daily Service', '2x1 AC Berth'],
    };
  }
  if (lower.includes('super deluxe')) {
    return {
      category: 'Super Deluxe',
      filterKey: 'Deluxe',
      amenities: ['Daily Service', '2x2 Pushback AC'],
    };
  }
  if (lower.includes('deluxe')) {
    return {
      category: 'Deluxe',
      filterKey: 'Deluxe',
      amenities: ['Daily Service', '2x2 Recliner'],
    };
  }
  if (lower.includes('ordinary')) {
    return {
      category: 'Ordinary',
      filterKey: 'Ordinary',
      amenities: ['Daily Service', 'All-Stop Seating'],
    };
  }
  return {
    category: 'Express',
    filterKey: 'Express',
    amenities: ['Daily Service', '2x2 Seating'],
  };
}

function buildStopsFromVia(
  fromCity: CityHub,
  toCity: CityHub,
  viaText: string,
  depMins: number,
  durationMinutes: number,
  distanceKm: number,
  platformIndex: number,
  category: BusCategory
): RouteStop[] {
  const waypoints = viaText
    .split(/\s*-\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  return [
    {
      stopName: fromCity.name,
      stand: fromCity.stand,
      arrivalTime: formatMinsTo12h(depMins - 15),
      departureTime: formatMinsTo12h(depMins),
      haltMins: 15,
      distanceKm: 0,
      platform: `Platform ${(platformIndex % 6) + 1}`,
    },
    ...waypoints.map((wp, wpIdx) => {
      const ratio = (wpIdx + 1) / (waypoints.length + 1);
      const stopArr = depMins + Math.round(durationMinutes * ratio);
      const halt =
        category === 'Super Deluxe' || category === 'Super Luxury Volvo'
          ? 5
          : category === 'AC Sleeper'
          ? 10
          : 7;
      return {
        stopName: wp,
        stand: wp.includes('Sindhi Camp')
          ? 'Sindhi Camp Transit Terminal'
          : wp.includes('Bus Stand')
          ? wp
          : `${wp} Bus Stand`,
        arrivalTime: formatMinsTo12h(stopArr),
        departureTime: formatMinsTo12h(stopArr + halt),
        haltMins: halt,
        distanceKm: Math.round(distanceKm * ratio),
      };
    }),
    {
      stopName: toCity.name,
      stand: toCity.stand,
      arrivalTime: formatMinsTo12h(depMins + durationMinutes),
      departureTime: 'Terminates',
      haltMins: 0,
      distanceKm,
      platform: `Bay ${((platformIndex + 2) % 8) + 1}`,
    },
  ];
}

function createBusFromRaw(
  raw: RawDatasetRoute,
  fromCity: CityHub,
  toCity: CityHub,
  dateIso: string,
  overrideDepMins?: number,
  overrideIdSuffix?: string,
  overrideVia?: string
): BusService {
  const distanceKm = calculateRoadDistanceKm(fromCity, toCity);
  const depMins = overrideDepMins ?? parseTime12hToMins(raw.departure);
  const durationMinutes = parseDurationToMins(raw.duration);
  const arrMins = depMins + durationMinutes;
  const viaText = overrideVia ?? raw.via;
  const { category, filterKey, amenities } = normalizeCategory(raw.type);
  const seed = deterministicHash(`${raw.id}-${overrideIdSuffix ?? 'direct'}-${dateIso}`);
  const series =
    category === 'AC Sleeper'
      ? 'RJ-14-SL'
      : category === 'Super Deluxe' || category === 'Super Luxury Volvo'
      ? 'RJ-14-TD'
      : 'RJ-14-PA';

  return {
    id: `${raw.id}${overrideIdSuffix ? `-${overrideIdSuffix}` : ''}-${dateIso}`,
    busNumber: `${series}-${1400 + (seed % 8200)}`,
    serviceCode: overrideIdSuffix ? `${raw.id}-${overrideIdSuffix}` : raw.id,
    depotName: raw.depot,
    category,
    filterKey,
    fromCity,
    toCity,
    viaText,
    isDirectDataset: true,
    isConnecting: false,
    departureTime: formatMinsTo12h(depMins),
    arrivalTime: formatMinsTo12h(arrMins),
    departureMins: depMins,
    durationMinutes,
    durationLabel: raw.duration,
    distanceKm,
    boardingPoint: `${fromCity.stand} · Platform ${(seed % 6) + 1}`,
    droppingPoint: toCity.stand,
    amenities,
    stops: buildStopsFromVia(
      fromCity,
      toCity,
      viaText,
      depMins,
      durationMinutes,
      distanceKm,
      seed,
      category
    ),
    onTimePercent: 92 + (seed % 7),
  };
}

function chooseMajorTransitHubs(fromCity: CityHub, toCity: CityHub): string[] {
  const excluded = new Set([fromCity.name, toCity.name]);
  const candidates: string[] = [];

  // Regionally logical Rajasthan transit corridors
  const regions = new Set([fromCity.region, toCity.region]);

  if (regions.has('East') && !excluded.has('Jaipur (Sindhi Camp)')) {
    candidates.push('Jaipur (Sindhi Camp)');
  }
  if (
    (regions.has('West') && (regions.has('Central') || regions.has('South'))) ||
    (regions.has('West') && regions.has('West'))
  ) {
    if (!excluded.has('Jodhpur')) candidates.push('Jodhpur');
    if (!excluded.has('Pali')) candidates.push('Pali');
  }
  if (
    (regions.has('Central') || regions.has('South') || regions.has('West')) &&
    !excluded.has('Ajmer')
  ) {
    candidates.push('Ajmer');
  }
  if (regions.has('North') && !excluded.has('Bikaner')) {
    candidates.push('Bikaner');
  }
  if (regions.has('North') && !excluded.has('Sikar')) {
    candidates.push('Sikar');
  }
  if (regions.has('Southeast') && !excluded.has('Kota')) {
    candidates.push('Kota');
  }
  if (regions.has('South') && !excluded.has('Udaipur')) {
    candidates.push('Udaipur');
  }
  if (regions.has('East') && !excluded.has('Dausa')) {
    candidates.push('Dausa');
  }

  // Always guarantee major hubs fallback
  for (const fallback of ['Jaipur (Sindhi Camp)', 'Ajmer', 'Jodhpur']) {
    if (!excluded.has(fallback) && !candidates.includes(fallback)) {
      candidates.push(fallback);
    }
  }

  // Deduplicate and take 1-2 logical transit hubs
  const unique = Array.from(new Set(candidates));
  return unique.slice(0, 2);
}

/**
 * Generates deterministic RSRTC schedules for ANY pair of the 50 Rajasthan districts:
 * 1. Exact direct matches from RSRTC_ROUTES (plus complementary daily return/shift options if only 1 exists)
 * 2. Automatic reverse/return schedule if the opposite direction exists in RSRTC_ROUTES
 * 3. Smart Fallback / Connecting Bus Generator (3–4 schedules: morning, afternoon, evening/night)
 *    with logical Rajasthan transit hubs (Jaipur Sindhi Camp, Ajmer, Jodhpur, etc.) so ZERO searches return empty.
 */
export function generateBusSchedules(
  fromId: string,
  toId: string,
  dateIso: string
): BusService[] {
  const fromCity = findCityById(fromId);
  const toCity = findCityById(toId);

  if (!fromCity || !toCity || fromCity.id === toCity.id) return [];

  // 1. Exact direct matches from dataset
  const exactMatches = RSRTC_ROUTES.filter(
    (r) => r.from === fromCity.name && r.to === toCity.name
  );

  if (exactMatches.length > 0) {
    const directBuses = exactMatches.map((raw) =>
      createBusFromRaw(raw, fromCity, toCity, dateIso)
    );

    // Add realistic supplementary daily timings on the same verified corridor so passengers see a full day schedule
    const primary = exactMatches[0];
    const baseDep = parseTime12hToMins(primary.departure);
    const supplementaryOffsets = [
      { delta: 240, type: primary.type === 'Ordinary' ? 'Express' : 'Express', tag: 'AFT' },
      { delta: 510, type: primary.type === 'AC Sleeper' ? 'Super Deluxe' : 'Super Deluxe', tag: 'EVE' },
    ];

    const extras = supplementaryOffsets.map((opt) => {
      const shiftedMins = (baseDep + opt.delta) % 1440;
      const cloned: RawDatasetRoute = { ...primary, type: opt.type };
      return createBusFromRaw(cloned, fromCity, toCity, dateIso, shiftedMins, opt.tag);
    });

    return [...directBuses, ...extras].sort((a, b) => a.departureMins - b.departureMins);
  }

  // 2. Automatic Reverse / Return Schedule if opposite direction exists in dataset
  const reverseMatches = RSRTC_ROUTES.filter(
    (r) => r.from === toCity.name && r.to === fromCity.name
  );

  if (reverseMatches.length > 0) {
    const returnBuses: BusService[] = [];
    reverseMatches.forEach((raw) => {
      const reversedVia = raw.via
        .split(/\s*-\s*/)
        .map((s) => s.trim())
        .filter(Boolean)
        .reverse()
        .join(' - ');

      const outboundDep = parseTime12hToMins(raw.departure);
      const dur = parseDurationToMins(raw.duration);

      // Morning return + Afternoon return + Evening return
      const returnSlots = [
        { dep: Math.max(6 * 60, (outboundDep + 30) % (12 * 60)), type: raw.type, tag: 'RET1' },
        { dep: (outboundDep + dur + 60) % 1440, type: 'Express', tag: 'RET2' },
        { dep: 18 * 60 + 30, type: dur >= 300 ? 'AC Sleeper' : 'Super Deluxe', tag: 'RET3' },
      ];

      returnSlots.forEach((slot) => {
        const cloned: RawDatasetRoute = { ...raw, type: slot.type };
        returnBuses.push(
          createBusFromRaw(
            cloned,
            fromCity,
            toCity,
            dateIso,
            slot.dep,
            slot.tag,
            reversedVia
          )
        );
      });
    });

    return returnBuses.sort((a, b) => a.departureMins - b.departureMins);
  }

  // 3. Smart Fallback / Connecting Bus Generator for any other pair of the 50 Rajasthan districts
  const distanceKm = calculateRoadDistanceKm(fromCity, toCity);
  const transitHubs = chooseMajorTransitHubs(fromCity, toCity);
  const primaryVia = transitHubs.join(' - ');
  const altVia = transitHubs[0] ?? 'Jaipur (Sindhi Camp)';
  const seed = deterministicHash(`${fromCity.id}-${toCity.id}-${dateIso}`);

  const fallbackTemplates: {
    depMins: number;
    type: BusCategory;
    speedKmh: number;
    via: string;
    depot: string;
    codeTag: string;
  }[] = [
    {
      depMins: 6 * 60 + 30 + (seed % 3) * 15,
      type: 'Express',
      speedKmh: 48,
      via: primaryVia,
      depot: fromCity.depot,
      codeTag: 'M1',
    },
    {
      depMins: 11 * 60 + 15 + (seed % 4) * 15,
      type: 'Ordinary',
      speedKmh: 43,
      via: primaryVia,
      depot: toCity.depot,
      codeTag: 'A1',
    },
    {
      depMins: 15 * 60 + 30 + (seed % 3) * 15,
      type: 'Super Deluxe',
      speedKmh: 54,
      via: altVia,
      depot: `${altVia.replace(/\s*\(.*?\)\s*/g, '')} Depot`,
      codeTag: 'E1',
    },
    {
      depMins: 21 * 60 + (seed % 3) * 15,
      type: distanceKm >= 220 ? 'AC Sleeper' : 'Super Luxury Volvo',
      speedKmh: 56,
      via: altVia,
      depot: fromCity.depot,
      codeTag: 'N1',
    },
  ];

  return fallbackTemplates
    .map((tpl, idx) => {
      const durationMinutes = Math.max(
        75,
        Math.round(((distanceKm / tpl.speedKmh) * 60) / 5) * 5
      );
      const arrMins = tpl.depMins + durationMinutes;
      const { category, filterKey, amenities } = normalizeCategory(tpl.type);
      const busSeed = deterministicHash(`${fromCity.id}-${toCity.id}-${idx}-${dateIso}`);
      const series =
        category === 'AC Sleeper'
          ? 'RJ-14-SL'
          : category === 'Super Deluxe' || category === 'Super Luxury Volvo'
          ? 'RJ-14-TD'
          : 'RJ-14-PA';

      return {
        id: `CONN-${fromCity.code}-${toCity.code}-${tpl.codeTag}-${dateIso}`,
        busNumber: `${series}-${2100 + (busSeed % 7600)}`,
        serviceCode: `RSRTC-${fromCity.code}${toCity.code}-${tpl.codeTag}`,
        depotName: tpl.depot,
        category,
        filterKey,
        fromCity,
        toCity,
        viaText: tpl.via,
        isDirectDataset: false,
        isConnecting: true,
        departureTime: formatMinsTo12h(tpl.depMins),
        arrivalTime: formatMinsTo12h(arrMins),
        departureMins: tpl.depMins,
        durationMinutes,
        durationLabel: formatDuration(durationMinutes),
        distanceKm,
        boardingPoint: `${fromCity.stand} · Platform ${(busSeed % 5) + 1}`,
        droppingPoint: toCity.stand,
        amenities: [...amenities, `Via ${altVia}`],
        stops: buildStopsFromVia(
          fromCity,
          toCity,
          tpl.via,
          tpl.depMins,
          durationMinutes,
          distanceKm,
          busSeed,
          category
        ),
        onTimePercent: 90 + (busSeed % 8),
      };
    })
    .sort((a, b) => a.departureMins - b.departureMins);
}

export function getLocalTodayIso(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatIsoDateParts(iso: string): {
  dayNum: string;
  dayShort: string;
  monthShort: string;
  year: string;
  fullLabel: string;
} {
  const [y, m, d] = iso.split('-').map(Number);
  const now = new Date();
  const dateObj = new Date(
    Number.isFinite(y) ? y : now.getFullYear(),
    Number.isFinite(m) ? m - 1 : now.getMonth(),
    Number.isFinite(d) ? d : now.getDate()
  );
  const dayNum = String(dateObj.getDate()).padStart(2, '0');
  const year = String(dateObj.getFullYear());
  const dayShort = dateObj.toLocaleDateString('en-IN', { weekday: 'short' });
  const monthShort = dateObj.toLocaleDateString('en-IN', { month: 'short' });
  return {
    dayNum,
    dayShort,
    monthShort,
    year,
    fullLabel: `${dayShort}, ${dayNum} ${monthShort} ${year}`,
  };
}

export function shiftIsoDate(iso: string, deltaDays: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const now = new Date();
  const dateObj = new Date(
    Number.isFinite(y) ? y : now.getFullYear(),
    Number.isFinite(m) ? m - 1 : now.getMonth(),
    Number.isFinite(d) ? d : now.getDate()
  );
  dateObj.setDate(dateObj.getDate() + deltaDays);
  return getLocalTodayIso(dateObj);
}
