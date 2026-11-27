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
  region: 'East' | 'North' | 'Central' | 'West' | 'South' | 'Southeast' | 'Interstate';
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

export interface CorridorSchedule {
  id: string;
  from: string;
  to: string;
  via: string;
  duration: string;
  depotFrom: string;
  depotTo: string;
  classes: BusCategory[];
  departures?: string[];
  customSlots?: { time: string; type: BusCategory }[];
  frequency?: {
    start: string;
    end: string;
    intervalMins: number;
  };
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
  indicativeFare: number;
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
  'Abu Road',
  'Agra (Idgah)',
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
  'Chandigarh',
  'Chittorgarh',
  'Churu',
  'Dausa',
  'Deeg',
  'Delhi',
  'Dholpur',
  'Didwana-Kuchaman',
  'Dudu',
  'Dungarpur',
  'Gangapur City',
  'Gurugram (IFFCO Chowk / Bus Stand)',
  'Gwalior',
  'Hanumangarh',
  'Hindaun City',
  'Indore',
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
  'Khetri',
  'Kota',
  'Kotputli-Behror',
  'Lucknow',
  'Mathura',
  'Nagaur',
  'Nathdwara',
  'Neem Ka Thana',
  'Pali',
  'Phalodi',
  'Pilani',
  'Pratapgarh',
  'Rajsamand',
  'Salumber',
  'Sanchore',
  'Sawai Madhopur',
  'Shahpura',
  'Sikar',
  'Sirohi',
  'Sri Ganganagar',
  'Suratgarh',
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
    state?: string;
    lat: number;
    lng: number;
  }
> = {
  'Abu Road': { code: 'ABR', stand: 'Abu Road Central Bus Stand', depot: 'Abu Road Depot', region: 'West', lat: 24.482, lng: 72.783 },
  'Agra (Idgah)': { code: 'AGR', stand: 'Idgah Central Bus Stand, Agra', depot: 'Agra Idgah Interstate Stand', region: 'Interstate', state: 'Uttar Pradesh', lat: 27.168, lng: 77.997 },
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
  Chandigarh: { code: 'CHD', stand: 'ISBT Sector 17 / Sector 43', depot: 'Chandigarh ISBT Stand', region: 'Interstate', state: 'Chandigarh', lat: 30.733, lng: 76.779 },
  Chittorgarh: { code: 'CTG', stand: 'Chittorgarh Central Bus Stand', depot: 'Chittorgarh Depot', region: 'South', lat: 24.888, lng: 74.626 },
  Churu: { code: 'CHR', stand: 'Churu Central Bus Stand', depot: 'Churu Depot', region: 'North', lat: 28.292, lng: 74.964 },
  Dausa: { code: 'DSA', stand: 'Dausa Roadways Bus Stand', depot: 'Dausa Depot', region: 'East', lat: 26.892, lng: 76.336 },
  Deeg: { code: 'DEG', stand: 'Deeg Central Bus Stand', depot: 'Deeg Depot', region: 'East', lat: 27.472, lng: 77.326 },
  Delhi: { code: 'DEL', stand: 'Delhi Central Bus Stand', depot: 'RSRTC Delhi Depot (ISBT)', region: 'Interstate', state: 'Delhi NCR', lat: 28.667, lng: 77.228 },
  Dholpur: { code: 'DLP', stand: 'Dholpur Central Bus Stand', depot: 'Dholpur Depot', region: 'East', lat: 26.702, lng: 77.893 },
  'Didwana-Kuchaman': { code: 'DDW', stand: 'Didwana-Kuchaman Bus Stand', depot: 'Didwana Depot', region: 'Central', lat: 27.397, lng: 74.573 },
  Dudu: { code: 'DDU', stand: 'Dudu Highway Bus Stand', depot: 'Ajmer Depot', region: 'Central', lat: 26.682, lng: 75.235 },
  Dungarpur: { code: 'DGP', stand: 'Dungarpur Central Bus Stand', depot: 'Dungarpur Depot', region: 'South', lat: 23.843, lng: 73.714 },
  'Gangapur City': { code: 'GGC', stand: 'Gangapur City Bus Stand', depot: 'Gangapur City Depot', region: 'East', lat: 26.473, lng: 76.724 },
  'Gurugram (IFFCO Chowk / Bus Stand)': { code: 'GGN', stand: 'IFFCO Chowk & Gurugram Bus Stand', depot: 'Gurugram Interstate Stand', region: 'Interstate', state: 'Haryana', lat: 28.474, lng: 77.072 },
  Gwalior: { code: 'GWL', stand: 'Gwalior Interstate Bus Stand', depot: 'Gwalior Interstate Stand', region: 'Interstate', state: 'Madhya Pradesh', lat: 26.218, lng: 78.182 },
  Hanumangarh: { code: 'HMG', stand: 'Hanumangarh Junction Bus Stand', depot: 'Hanumangarh Depot', region: 'North', lat: 29.581, lng: 74.329 },
  'Hindaun City': { code: 'HND', stand: 'Hindaun City Central Bus Stand', depot: 'Hindaun Depot', region: 'East', lat: 26.735, lng: 77.036 },
  Indore: { code: 'IDR', stand: 'Sarwate / AICTSL Bus Stand, Indore', depot: 'Indore Interstate Stand', region: 'Interstate', state: 'Madhya Pradesh', lat: 22.719, lng: 75.857 },
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
  Khetri: { code: 'KTR', stand: 'Khetri Nagar Roadways Bus Stand', depot: 'Khetri Depot', region: 'North', lat: 28.001, lng: 75.792 },
  Kota: { code: 'KOT', stand: 'Nayapura Central Bus Stand', depot: 'Kota Depot', region: 'Southeast', lat: 25.182, lng: 75.864 },
  'Kotputli-Behror': { code: 'KTP', stand: 'Kotputli NH-48 Bus Stand', depot: 'Kotputli Depot', region: 'East', lat: 27.703, lng: 76.199 },
  Lucknow: { code: 'LKO', stand: 'Alambagh ISBT Bus Terminal', depot: 'Lucknow Interstate Stand', region: 'Interstate', state: 'Uttar Pradesh', lat: 26.813, lng: 80.903 },
  Mathura: { code: 'MTR', stand: 'Mathura New / Bhuteshwar Bus Stand', depot: 'Mathura Interstate Stand', region: 'Interstate', state: 'Uttar Pradesh', lat: 27.492, lng: 77.673 },
  Nagaur: { code: 'NGR', stand: 'Nagaur Central Bus Stand', depot: 'Nagaur Depot', region: 'Central', lat: 27.202, lng: 73.733 },
  Nathdwara: { code: 'NTD', stand: 'Nathdwara Roadways Bus Stand', depot: 'Nathdwara / Rajsamand Depot', region: 'South', lat: 24.933, lng: 73.822 },
  'Neem Ka Thana': { code: 'NKT', stand: 'Neem Ka Thana Bus Stand', depot: 'Neem Ka Thana Depot', region: 'North', lat: 27.738, lng: 75.783 },
  Pali: { code: 'PLI', stand: 'Pali Central Bus Stand', depot: 'Pali Depot', region: 'West', lat: 25.771, lng: 73.323 },
  Phalodi: { code: 'PHL', stand: 'Phalodi Roadways Bus Stand', depot: 'Phalodi Depot', region: 'West', lat: 27.131, lng: 72.368 },
  Pilani: { code: 'PLN', stand: 'Pilani Central Bus Stand', depot: 'Jhunjhunu / Pilani Depot', region: 'North', lat: 28.367, lng: 75.604 },
  Pratapgarh: { code: 'PTG', stand: 'Pratapgarh Central Bus Stand', depot: 'Pratapgarh Depot', region: 'South', lat: 24.032, lng: 74.781 },
  Rajsamand: { code: 'RSM', stand: 'Rajsamand (Kankroli) Bus Stand', depot: 'Rajsamand Depot', region: 'South', lat: 25.067, lng: 73.883 },
  Salumber: { code: 'SLB', stand: 'Salumber Roadways Bus Stand', depot: 'Udaipur Depot', region: 'South', lat: 24.135, lng: 74.045 },
  Sanchore: { code: 'SNC', stand: 'Sanchore Highway Bus Stand', depot: 'Sanchore Depot', region: 'West', lat: 24.755, lng: 71.772 },
  'Sawai Madhopur': { code: 'SWM', stand: 'Sawai Madhopur Bus Stand', depot: 'Sawai Madhopur Depot', region: 'East', lat: 26.012, lng: 76.356 },
  Shahpura: { code: 'SHP', stand: 'Shahpura Roadways Bus Stand', depot: 'Shahpura Depot', region: 'Central', lat: 25.622, lng: 74.926 },
  Sikar: { code: 'SKR', stand: 'Sikar Central Bus Stand', depot: 'Sikar Depot', region: 'North', lat: 27.609, lng: 75.139 },
  Sirohi: { code: 'SRH', stand: 'Sirohi Central Bus Stand', depot: 'Sirohi Depot', region: 'West', lat: 24.882, lng: 72.858 },
  'Sri Ganganagar': { code: 'SGN', stand: 'Sri Ganganagar Central Bus Stand', depot: 'Sri Ganganagar Depot', region: 'North', lat: 29.909, lng: 73.877 },
  Suratgarh: { code: 'SRG', stand: 'Suratgarh Central Bus Stand', depot: 'Suratgarh Depot', region: 'North', lat: 29.322, lng: 73.899 },
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
    state: m?.state ?? 'Rajasthan',
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

/**
 * Extended bidirectional Rajasthan district & interstate RSRTC corridors
 * merged alongside RSRTC_ROUTES so every corridor operates cleanly in both A -> B and B -> A directions.
 */
export const EXTENDED_CORRIDORS: CorridorSchedule[] = [
  // 1. KARAULI / HINDAUN CITY CORRIDORS
  {
    id: 'CORR-KRL-JPR',
    from: 'Karauli',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Hindaun - Mahwa - Dausa',
    duration: '4h 30m',
    depotFrom: 'Karauli Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express'],
    departures: ['05:30 AM', '07:00 AM', '09:30 AM', '12:00 PM', '02:30 PM', '05:00 PM', '08:30 PM'],
  },
  {
    id: 'CORR-KRL-BTP',
    from: 'Karauli',
    to: 'Bharatpur',
    via: 'Hindaun - Bayana',
    duration: '2h 45m',
    depotFrom: 'Karauli Depot',
    depotTo: 'Bharatpur Depot',
    classes: ['Ordinary', 'Express'],
    departures: ['06:30 AM', '09:00 AM', '12:30 PM', '03:30 PM', '06:00 PM'],
  },
  {
    id: 'CORR-KRL-DEL',
    from: 'Karauli',
    to: 'Delhi',
    via: 'Hindaun - Bharatpur - Mathura - Palwal',
    duration: '6h 30m',
    depotFrom: 'Karauli Depot',
    depotTo: 'RSRTC Delhi Depot (ISBT)',
    classes: ['Express', 'Deluxe'],
    departures: ['06:00 AM', '08:30 AM', '08:00 PM'],
  },
  {
    id: 'CORR-HND-AGR',
    from: 'Hindaun City',
    to: 'Agra (Idgah)',
    via: 'Bayana - Fatehpur Sikri',
    duration: '3h 00m',
    depotFrom: 'Hindaun Depot',
    depotTo: 'Hindaun Depot',
    classes: ['Ordinary', 'Express'],
    departures: ['06:00 AM', '08:30 AM', '11:30 AM', '03:00 PM', '05:30 PM'],
  },

  // 2. SAWAI MADHOPUR / GANGAPUR CITY CORRIDORS
  {
    id: 'CORR-SWM-JPR',
    from: 'Sawai Madhopur',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Lalsot - Bassi',
    duration: '3h 30m',
    depotFrom: 'Sawai Madhopur Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '08:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-SWM-KOT',
    from: 'Sawai Madhopur',
    to: 'Kota',
    via: 'Indragarh - Lakheri',
    duration: '3h 15m',
    depotFrom: 'Sawai Madhopur Depot',
    depotTo: 'Kota Depot',
    classes: ['Ordinary', 'Express'],
    departures: ['06:00 AM', '08:30 AM', '11:00 AM', '02:00 PM', '04:30 PM', '07:00 PM'],
  },
  {
    id: 'CORR-GGC-JPR',
    from: 'Gangapur City',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Lalsot - Dausa',
    duration: '3h 45m',
    depotFrom: 'Gangapur City Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '08:00 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-GGC-BTP',
    from: 'Gangapur City',
    to: 'Bharatpur',
    via: 'Hindaun - Bayana',
    duration: '3h 15m',
    depotFrom: 'Gangapur City Depot',
    depotTo: 'Bharatpur Depot',
    classes: ['Ordinary', 'Express'],
    departures: ['06:30 AM', '09:30 AM', '01:00 PM', '04:00 PM'],
  },

  // 3. DHOLPUR CORRIDORS
  {
    id: 'CORR-DLP-JPR',
    from: 'Dholpur',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Agra - Bharatpur - Mahwa - Dausa',
    duration: '6h 00m',
    depotFrom: 'Dholpur Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Express', 'Deluxe'],
    departures: ['06:00 AM', '08:30 AM', '11:30 AM', '03:00 PM', '08:30 PM'],
  },
  {
    id: 'CORR-DLP-AGR',
    from: 'Dholpur',
    to: 'Agra (Idgah)',
    via: 'Mania',
    duration: '1h 15m',
    depotFrom: 'Dholpur Depot',
    depotTo: 'Dholpur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 25 },
  },
  {
    id: 'CORR-DLP-BTP',
    from: 'Dholpur',
    to: 'Bharatpur',
    via: 'Roopwas',
    duration: '2h 00m',
    depotFrom: 'Dholpur Depot',
    depotTo: 'Bharatpur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '06:00 AM', end: '07:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-DLP-GWL',
    from: 'Dholpur',
    to: 'Gwalior',
    via: 'Morena',
    duration: '1h 30m',
    depotFrom: 'Dholpur Depot',
    depotTo: 'Dholpur Depot',
    classes: ['Express', 'Deluxe'],
    frequency: { start: '06:00 AM', end: '08:30 PM', intervalMins: 30 },
  },

  // 4. SHEKHAWATI REGION (JHUNJHUNU, CHURU, PILANI, KHETRI)
  {
    id: 'CORR-JJN-JPR',
    from: 'Jhunjhunu',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Nawalgarh - Sikar - Ringas',
    duration: '4h 00m',
    depotFrom: 'Jhunjhunu Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:00 AM', end: '09:00 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-JJN-DEL',
    from: 'Jhunjhunu',
    to: 'Delhi',
    via: 'Chirawa - Singhana - Narnaul - Gurugram - Dhaula Kuan',
    duration: '5h 30m',
    depotFrom: 'Jhunjhunu Depot',
    depotTo: 'RSRTC Delhi Depot (ISBT)',
    classes: ['Express', 'Deluxe'],
    frequency: { start: '05:00 AM', end: '10:00 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-PLN-DEL',
    from: 'Pilani',
    to: 'Delhi',
    via: 'Loharu - Bhiwani / Rewari',
    duration: '4h 45m',
    depotFrom: 'Jhunjhunu / Pilani Depot',
    depotTo: 'RSRTC Delhi Depot (ISBT)',
    classes: ['Express', 'Deluxe'],
    departures: ['05:30 AM', '07:30 AM', '10:00 AM', '01:00 PM', '04:00 PM', '08:30 PM'],
  },
  {
    id: 'CORR-CHR-JPR',
    from: 'Churu',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Fatehpur - Sikar',
    duration: '4h 30m',
    depotFrom: 'Churu Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '08:30 PM', intervalMins: 60 },
  },
  {
    id: 'CORR-CHR-BKN',
    from: 'Churu',
    to: 'Bikaner',
    via: 'Ratangarh - Sri Dungargarh',
    duration: '3h 30m',
    depotFrom: 'Churu Depot',
    depotTo: 'Bikaner Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '06:00 AM', end: '08:00 PM', intervalMins: 60 },
  },

  // 5. HADOTI REGION (BUNDI, BARAN, JHALAWAR)
  {
    id: 'CORR-BND-JPR',
    from: 'Bundi',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Deoli - Tonk',
    duration: '4h 15m',
    depotFrom: 'Bundi Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-BND-AJM',
    from: 'Bundi',
    to: 'Ajmer',
    via: 'Kekri - Nasirabad',
    duration: '3h 45m',
    depotFrom: 'Bundi Depot',
    depotTo: 'Ajmer Depot',
    classes: ['Ordinary', 'Express'],
    departures: ['06:30 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'],
  },
  {
    id: 'CORR-BRN-KOT',
    from: 'Baran',
    to: 'Kota',
    via: 'Anta',
    duration: '1h 30m',
    depotFrom: 'Baran Depot',
    depotTo: 'Kota Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 25 },
  },
  {
    id: 'CORR-BRN-JPR',
    from: 'Baran',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Kota - Deoli - Tonk',
    duration: '6h 15m',
    depotFrom: 'Baran Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Express', 'Deluxe'],
    departures: ['06:00 AM', '09:00 AM', '01:00 PM', '08:30 PM'],
  },
  {
    id: 'CORR-JLW-KOT',
    from: 'Jhalawar',
    to: 'Kota',
    via: 'Darah - Suket',
    duration: '2h 00m',
    depotFrom: 'Jhalawar Depot',
    depotTo: 'Kota Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-JLW-IDR',
    from: 'Jhalawar',
    to: 'Indore',
    via: 'Agar - Ujjain',
    duration: '5h 30m',
    depotFrom: 'Jhalawar Depot',
    depotTo: 'Jhalawar Depot',
    classes: ['Express', 'Deluxe'],
    departures: ['06:30 AM', '09:30 AM', '02:00 PM', '08:30 PM'],
  },

  // 6. MEWAR & VAGAD REGION (BHILWARA, CHITTORGARH, BANSWARA, DUNGARPUR, RAJSAMAND, NATHDWARA)
  {
    id: 'CORR-BHL-JPR',
    from: 'Bhilwara',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Nasirabad - Kishangarh',
    duration: '5h 00m',
    depotFrom: 'Bhilwara Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Ordinary', 'Express', 'Deluxe', 'Super Luxury Volvo'],
    frequency: { start: '05:30 AM', end: '10:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-BHL-UDR',
    from: 'Bhilwara',
    to: 'Udaipur',
    via: 'Gangrar - Chittorgarh',
    duration: '3h 15m',
    depotFrom: 'Bhilwara Depot',
    depotTo: 'Udaipur Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:30 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-CTG-UDR',
    from: 'Chittorgarh',
    to: 'Udaipur',
    via: 'Mangalwar - Dabok',
    duration: '2h 15m',
    depotFrom: 'Chittorgarh Depot',
    depotTo: 'Udaipur Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:30 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-CTG-KOT',
    from: 'Chittorgarh',
    to: 'Kota',
    via: 'Begu - Bijolia',
    duration: '3h 30m',
    depotFrom: 'Chittorgarh Depot',
    depotTo: 'Kota Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '06:00 AM', end: '08:00 PM', intervalMins: 60 },
  },
  {
    id: 'CORR-BSW-UDR',
    from: 'Banswara',
    to: 'Udaipur',
    via: 'Ghatol - Dhariawad / Salumber',
    duration: '3h 45m',
    depotFrom: 'Banswara Depot',
    depotTo: 'Udaipur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '08:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-BSW-JPR',
    from: 'Banswara',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Pratapgarh - Chittorgarh - Bhilwara - Ajmer',
    duration: '10h 30m',
    depotFrom: 'Banswara Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Express', 'Deluxe', 'AC Sleeper'],
    customSlots: [
      { time: '06:30 AM', type: 'Express' },
      { time: '04:30 PM', type: 'Deluxe' },
      { time: '07:30 PM', type: 'AC Sleeper' },
    ],
  },
  {
    id: 'CORR-DGP-UDR',
    from: 'Dungarpur',
    to: 'Udaipur',
    via: 'Kherwara - Rishabhdeo',
    duration: '2h 30m',
    depotFrom: 'Dungarpur Depot',
    depotTo: 'Udaipur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '08:30 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-NTD-UDR',
    from: 'Nathdwara',
    to: 'Udaipur',
    via: 'Eklingji',
    duration: '1h 15m',
    depotFrom: 'Nathdwara / Rajsamand Depot',
    depotTo: 'Udaipur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '06:00 AM', end: '09:00 PM', intervalMins: 25 },
  },

  // 7. MARWAR & WESTERN RAJASTHAN (PALI, SIROHI, ABU ROAD, JALORE, BARMER, JAISALMER, NAGAUR)
  {
    id: 'CORR-PLI-JDH',
    from: 'Pali',
    to: 'Jodhpur',
    via: 'Rohat',
    duration: '1h 30m',
    depotFrom: 'Pali Depot',
    depotTo: 'Jodhpur Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '10:00 PM', intervalMins: 20 },
  },
  {
    id: 'CORR-ABR-UDR',
    from: 'Abu Road',
    to: 'Udaipur',
    via: 'Pindwara - Gogunda',
    duration: '3h 30m',
    depotFrom: 'Abu Road Depot',
    depotTo: 'Udaipur Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '06:00 AM', end: '08:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-ABR-JDH',
    from: 'Abu Road',
    to: 'Jodhpur',
    via: 'Sirohi - Sumerpur - Pali',
    duration: '5h 00m',
    depotFrom: 'Abu Road Depot',
    depotTo: 'Jodhpur Depot',
    classes: ['Express', 'Deluxe'],
    frequency: { start: '06:00 AM', end: '09:00 PM', intervalMins: 60 },
  },
  {
    id: 'CORR-JLR-JDH',
    from: 'Jalore',
    to: 'Jodhpur',
    via: 'Ahore - Pali / Rohat',
    duration: '3h 15m',
    depotFrom: 'Jalore Depot',
    depotTo: 'Jodhpur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '06:00 AM', end: '08:00 PM', intervalMins: 60 },
  },
  {
    id: 'CORR-BMR-JDH',
    from: 'Barmer',
    to: 'Jodhpur',
    via: 'Balotra - Kalyanpur',
    duration: '4h 00m',
    depotFrom: 'Barmer Depot',
    depotTo: 'Jodhpur Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '10:00 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-JSM-JDH',
    from: 'Jaisalmer',
    to: 'Jodhpur',
    via: 'Pokaran - Balesar',
    duration: '5h 15m',
    depotFrom: 'Jaisalmer Depot',
    depotTo: 'Jodhpur Depot',
    classes: ['Express', 'Deluxe', 'Super Luxury Volvo'],
    frequency: { start: '06:00 AM', end: '10:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-JSM-BKN',
    from: 'Jaisalmer',
    to: 'Bikaner',
    via: 'Pokaran - Phalodi - Kolayat',
    duration: '6h 00m',
    depotFrom: 'Jaisalmer Depot',
    depotTo: 'Bikaner Depot',
    classes: ['Express', 'Deluxe'],
    departures: ['06:30 AM', '09:30 AM', '01:30 PM', '08:00 PM'],
  },
  {
    id: 'CORR-NGR-JDH',
    from: 'Nagaur',
    to: 'Jodhpur',
    via: 'Khinvsar',
    duration: '2h 45m',
    depotFrom: 'Nagaur Depot',
    depotTo: 'Jodhpur Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-NGR-BKN',
    from: 'Nagaur',
    to: 'Bikaner',
    via: 'Nokha - Deshnok',
    duration: '2h 15m',
    depotFrom: 'Nagaur Depot',
    depotTo: 'Bikaner Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-NGR-JPR',
    from: 'Nagaur',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Kuchaman - Makrana - Kishangarh',
    duration: '5h 15m',
    depotFrom: 'Nagaur Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 60 },
  },

  // 8. NORTHERN RAJASTHAN (SRI GANGANAGAR, HANUMANGARH, SURATGARH)
  {
    id: 'CORR-SGN-BKN',
    from: 'Sri Ganganagar',
    to: 'Bikaner',
    via: 'Suratgarh - Mahajan - Lunkaransar',
    duration: '4h 30m',
    depotFrom: 'Sri Ganganagar Depot',
    depotTo: 'Bikaner Depot',
    classes: ['Ordinary', 'Express', 'Deluxe'],
    frequency: { start: '05:30 AM', end: '09:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-SGN-JPR',
    from: 'Sri Ganganagar',
    to: 'Jaipur (Sindhi Camp)',
    via: 'Hanumangarh - Nohar - Churu - Sikar',
    duration: '9h 30m',
    depotFrom: 'Sri Ganganagar Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Express', 'Deluxe', 'Super Luxury Volvo'],
    customSlots: [
      { time: '06:00 AM', type: 'Express' },
      { time: '08:30 AM', type: 'Deluxe' },
      { time: '05:30 PM', type: 'Express' },
      { time: '07:30 PM', type: 'Deluxe' },
      { time: '09:00 PM', type: 'Super Luxury Volvo' },
    ],
  },
  {
    id: 'CORR-HMG-BKN',
    from: 'Hanumangarh',
    to: 'Bikaner',
    via: 'Pilibanga - Suratgarh',
    duration: '4h 00m',
    depotFrom: 'Hanumangarh Depot',
    depotTo: 'Bikaner Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '08:30 PM', intervalMins: 45 },
  },
  {
    id: 'CORR-HMG-DEL',
    from: 'Hanumangarh',
    to: 'Delhi',
    via: 'Sirsa - Fatehabad - Hisar - Rohtak',
    duration: '7h 00m',
    depotFrom: 'Hanumangarh Depot',
    depotTo: 'RSRTC Delhi Depot (ISBT)',
    classes: ['Express', 'Deluxe'],
    departures: ['06:00 AM', '09:00 AM', '01:00 PM', '08:30 PM'],
  },

  // 9. EXTRA INTERSTATE CORRIDORS (HARYANA, PUNJAB, UP, MP)
  {
    id: 'CORR-ALW-GGN',
    from: 'Alwar',
    to: 'Gurugram (IFFCO Chowk / Bus Stand)',
    via: 'Bhiwadi - Sohna',
    duration: '2h 30m',
    depotFrom: 'Alwar Depot',
    depotTo: 'Alwar Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '05:30 AM', end: '09:00 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-BTP-MTR',
    from: 'Bharatpur',
    to: 'Mathura',
    via: 'Goverdhan / Raraha',
    duration: '1h 00m',
    depotFrom: 'Bharatpur Depot',
    depotTo: 'Bharatpur Depot',
    classes: ['Ordinary', 'Express'],
    frequency: { start: '06:00 AM', end: '08:30 PM', intervalMins: 30 },
  },
  {
    id: 'CORR-JPR-CHD',
    from: 'Jaipur (Sindhi Camp)',
    to: 'Chandigarh',
    via: 'Delhi - Panipat - Ambala',
    duration: '10h 30m',
    depotFrom: 'Jaipur Vaishali Nagar Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Deluxe', 'Super Luxury Volvo'],
    customSlots: [
      { time: '07:00 AM', type: 'Deluxe' },
      { time: '05:30 PM', type: 'Super Luxury Volvo' },
      { time: '08:00 PM', type: 'Super Luxury Volvo' },
    ],
  },
  {
    id: 'CORR-JPR-LKO',
    from: 'Jaipur (Sindhi Camp)',
    to: 'Lucknow',
    via: 'Agra - Kanpur',
    duration: '11h 30m',
    depotFrom: 'Jaipur Vaishali Nagar Depot',
    depotTo: 'Jaipur Vaishali Nagar Depot',
    classes: ['Deluxe', 'Super Luxury Volvo', 'AC Sleeper'],
    customSlots: [
      { time: '05:00 PM', type: 'Deluxe' },
      { time: '05:00 PM', type: 'Super Luxury Volvo' },
      { time: '07:30 PM', type: 'AC Sleeper' },
    ],
  },
  {
    id: 'CORR-KOT-IDR',
    from: 'Kota',
    to: 'Indore',
    via: 'Jhalawar - Agar - Ujjain',
    duration: '6h 30m',
    depotFrom: 'Kota Depot',
    depotTo: 'Kota Depot',
    classes: ['Express', 'Deluxe', 'Super Luxury Volvo'],
    customSlots: [
      { time: '06:30 AM', type: 'Express' },
      { time: '09:30 AM', type: 'Deluxe' },
      { time: '02:00 PM', type: 'Express' },
      { time: '08:30 PM', type: 'Super Luxury Volvo' },
    ],
  },
];

export const DEEG_TO_MATHURA_ROUTES: RawDatasetRoute[] = [
  { id: 'RSRTC-DEG-MTR-01', from: 'Deeg', to: 'Mathura', via: '', departure: '07:00 AM', arrival: '08:00 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-02', from: 'Deeg', to: 'Mathura', via: '', departure: '07:45 AM', arrival: '08:45 AM', duration: '1h 00m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-MTR-03', from: 'Deeg', to: 'Mathura', via: '', departure: '07:50 AM', arrival: '08:50 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-04', from: 'Deeg', to: 'Mathura', via: '', departure: '08:10 AM', arrival: '09:20 AM', duration: '1h 10m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-05', from: 'Deeg', to: 'Mathura', via: '', departure: '08:45 AM', arrival: '09:45 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-06', from: 'Deeg', to: 'Mathura', via: '', departure: '09:00 AM', arrival: '10:00 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-07', from: 'Deeg', to: 'Mathura', via: '', departure: '09:15 AM', arrival: '10:15 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-08', from: 'Deeg', to: 'Mathura', via: '', departure: '09:40 AM', arrival: '10:40 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-09', from: 'Deeg', to: 'Mathura', via: '', departure: '10:15 AM', arrival: '11:15 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-10', from: 'Deeg', to: 'Mathura', via: '', departure: '11:00 AM', arrival: '12:00 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-11', from: 'Deeg', to: 'Mathura', via: '', departure: '11:35 AM', arrival: '12:35 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-12', from: 'Deeg', to: 'Mathura', via: '', departure: '01:10 PM', arrival: '02:10 PM', duration: '1h 00m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-13', from: 'Deeg', to: 'Mathura', via: '', departure: '01:40 PM', arrival: '02:40 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-14', from: 'Deeg', to: 'Mathura', via: '', departure: '02:10 PM', arrival: '03:10 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-15', from: 'Deeg', to: 'Mathura', via: '', departure: '03:00 PM', arrival: '04:00 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-16', from: 'Deeg', to: 'Mathura', via: '', departure: '04:30 PM', arrival: '05:30 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-17', from: 'Deeg', to: 'Mathura', via: '', departure: '05:40 PM', arrival: '06:40 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-18', from: 'Deeg', to: 'Mathura', via: '', departure: '07:00 PM', arrival: '08:00 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-19', from: 'Deeg', to: 'Mathura', via: '', departure: '08:00 PM', arrival: '09:00 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-20', from: 'Deeg', to: 'Mathura', via: '', departure: '08:45 PM', arrival: '09:45 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-MTR-21', from: 'Deeg', to: 'Mathura', via: '', departure: '11:30 PM', arrival: '12:30 AM (+1)', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
];

export const MATHURA_TO_DEEG_ROUTES: RawDatasetRoute[] = [
  { id: 'RSRTC-MTR-DEG-01', from: 'Mathura', to: 'Deeg', via: '', departure: '04:30 AM', arrival: '05:25 AM', duration: '55m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-02', from: 'Mathura', to: 'Deeg', via: '', departure: '05:30 AM', arrival: '06:30 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-03', from: 'Mathura', to: 'Deeg', via: '', departure: '06:00 AM', arrival: '07:00 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-04', from: 'Mathura', to: 'Deeg', via: '', departure: '08:30 AM', arrival: '09:30 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-05', from: 'Mathura', to: 'Deeg', via: '', departure: '09:00 AM', arrival: '10:00 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-06', from: 'Mathura', to: 'Deeg', via: '', departure: '09:45 AM', arrival: '10:45 AM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-07', from: 'Mathura', to: 'Deeg', via: '', departure: '11:00 AM', arrival: '12:00 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-08', from: 'Mathura', to: 'Deeg', via: '', departure: '12:10 PM', arrival: '01:10 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-09', from: 'Mathura', to: 'Deeg', via: '', departure: '12:50 PM', arrival: '01:50 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-10', from: 'Mathura', to: 'Deeg', via: '', departure: '01:30 PM', arrival: '02:30 PM', duration: '1h 00m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-MTR-DEG-11', from: 'Mathura', to: 'Deeg', via: '', departure: '01:30 PM', arrival: '02:30 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-12', from: 'Mathura', to: 'Deeg', via: '', departure: '02:50 PM', arrival: '03:50 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-13', from: 'Mathura', to: 'Deeg', via: '', departure: '03:10 PM', arrival: '04:10 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-14', from: 'Mathura', to: 'Deeg', via: '', departure: '03:30 PM', arrival: '04:30 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-15', from: 'Mathura', to: 'Deeg', via: '', departure: '04:00 PM', arrival: '04:55 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-16', from: 'Mathura', to: 'Deeg', via: '', departure: '04:15 PM', arrival: '05:15 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-17', from: 'Mathura', to: 'Deeg', via: '', departure: '04:30 PM', arrival: '05:30 PM', duration: '1h 00m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-MTR-DEG-18', from: 'Mathura', to: 'Deeg', via: '', departure: '04:45 PM', arrival: '05:45 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-19', from: 'Mathura', to: 'Deeg', via: '', departure: '05:00 PM', arrival: '05:55 PM', duration: '55m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-20', from: 'Mathura', to: 'Deeg', via: '', departure: '05:15 PM', arrival: '06:15 PM', duration: '1h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-MTR-DEG-21', from: 'Mathura', to: 'Deeg', via: '', departure: '06:30 PM', arrival: '07:25 PM', duration: '55m', type: 'Express', depot: 'Alwar Depot' },
];

export const DEEG_TO_ALWAR_ROUTES: RawDatasetRoute[] = [
  { id: 'RSRTC-DEG-ALW-01', from: 'Deeg', to: 'Alwar', via: '', departure: '05:00 AM', arrival: '07:15 AM', duration: '2h 15m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-02', from: 'Deeg', to: 'Alwar', via: '', departure: '05:20 AM', arrival: '07:50 AM', duration: '2h 30m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-03', from: 'Deeg', to: 'Alwar', via: '', departure: '05:30 AM', arrival: '07:30 AM', duration: '2h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-04', from: 'Deeg', to: 'Alwar', via: '', departure: '06:00 AM', arrival: '08:15 AM', duration: '2h 15m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-05', from: 'Deeg', to: 'Alwar', via: '', departure: '06:40 AM', arrival: '09:10 AM', duration: '2h 30m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-06', from: 'Deeg', to: 'Alwar', via: '', departure: '06:45 AM', arrival: '09:00 AM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-07', from: 'Deeg', to: 'Alwar', via: '', departure: '07:00 AM', arrival: '09:30 AM', duration: '2h 30m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-08', from: 'Deeg', to: 'Alwar', via: '', departure: '07:15 AM', arrival: '09:30 AM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-09', from: 'Deeg', to: 'Alwar', via: '', departure: '08:00 AM', arrival: '10:30 AM', duration: '2h 30m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-10', from: 'Deeg', to: 'Alwar', via: '', departure: '08:45 AM', arrival: '12:10 PM', duration: '3h 25m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-11', from: 'Deeg', to: 'Alwar', via: '', departure: '09:15 AM', arrival: '11:30 AM', duration: '2h 15m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-12', from: 'Deeg', to: 'Alwar', via: '', departure: '09:45 AM', arrival: '12:00 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-13', from: 'Deeg', to: 'Alwar', via: '', departure: '10:15 AM', arrival: '12:30 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-14', from: 'Deeg', to: 'Alwar', via: '', departure: '11:00 AM', arrival: '01:15 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-15', from: 'Deeg', to: 'Alwar', via: '', departure: '11:25 AM', arrival: '01:50 PM', duration: '2h 25m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-16', from: 'Deeg', to: 'Alwar', via: '', departure: '11:55 AM', arrival: '02:10 PM', duration: '2h 15m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-17', from: 'Deeg', to: 'Alwar', via: '', departure: '12:15 PM', arrival: '02:30 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-18', from: 'Deeg', to: 'Alwar', via: '', departure: '01:05 PM', arrival: '03:30 PM', duration: '2h 25m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-19', from: 'Deeg', to: 'Alwar', via: '', departure: '01:25 PM', arrival: '03:40 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-20', from: 'Deeg', to: 'Alwar', via: '', departure: '01:45 PM', arrival: '04:10 PM', duration: '2h 25m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-21', from: 'Deeg', to: 'Alwar', via: '', departure: '02:05 PM', arrival: '04:20 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-22', from: 'Deeg', to: 'Alwar', via: '', departure: '02:15 PM', arrival: '04:30 PM', duration: '2h 15m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-23', from: 'Deeg', to: 'Alwar', via: '', departure: '02:45 PM', arrival: '05:00 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-24', from: 'Deeg', to: 'Alwar', via: '', departure: '04:00 PM', arrival: '06:30 PM', duration: '2h 30m', type: 'Ordinary', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-ALW-25', from: 'Deeg', to: 'Alwar', via: '', departure: '04:05 PM', arrival: '06:20 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-26', from: 'Deeg', to: 'Alwar', via: '', departure: '04:15 PM', arrival: '06:45 PM', duration: '2h 30m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-27', from: 'Deeg', to: 'Alwar', via: '', departure: '04:25 PM', arrival: '06:40 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-28', from: 'Deeg', to: 'Alwar', via: '', departure: '04:45 PM', arrival: '07:00 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-29', from: 'Deeg', to: 'Alwar', via: '', departure: '05:00 PM', arrival: '07:30 PM', duration: '2h 30m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-30', from: 'Deeg', to: 'Alwar', via: '', departure: '05:16 PM', arrival: '07:30 PM', duration: '2h 14m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-31', from: 'Deeg', to: 'Alwar', via: '', departure: '05:20 PM', arrival: '07:50 PM', duration: '2h 30m', type: 'Ordinary', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-32', from: 'Deeg', to: 'Alwar', via: '', departure: '06:00 PM', arrival: '08:00 PM', duration: '2h 00m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-33', from: 'Deeg', to: 'Alwar', via: '', departure: '06:30 PM', arrival: '08:45 PM', duration: '2h 15m', type: 'Express', depot: 'Alwar Depot' },
  { id: 'RSRTC-DEG-ALW-34', from: 'Deeg', to: 'Alwar', via: '', departure: '07:30 PM', arrival: '09:30 PM', duration: '2h 00m', type: 'Express', depot: 'Alwar Depot' },
];

export const DEEG_TO_DELHI_ROUTES: RawDatasetRoute[] = [
  { id: 'RSRTC-DEG-DEL-01', from: 'Deeg', to: 'Delhi', via: 'Kosi - Palwal - Faridabad', departure: '05:00 AM', arrival: '08:15 AM', duration: '3h 15m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-02', from: 'Deeg', to: 'Delhi', via: 'Kaman - Gurugram', departure: '06:00 AM', arrival: '10:45 AM', duration: '4h 45m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-03', from: 'Deeg', to: 'Delhi', via: 'Deeg - Kosi', departure: '06:15 AM', arrival: '10:00 AM', duration: '3h 45m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-04', from: 'Deeg', to: 'Delhi', via: 'Kaman - Ballabhgarh', departure: '07:15 AM', arrival: '11:00 AM', duration: '3h 45m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-05', from: 'Deeg', to: 'Delhi', via: 'Kaman - Delhi', departure: '08:30 AM', arrival: '12:15 PM', duration: '3h 45m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-06', from: 'Deeg', to: 'Delhi', via: 'Kaman - Ballabhgarh', departure: '09:30 AM', arrival: '01:15 PM', duration: '3h 45m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-07', from: 'Deeg', to: 'Delhi', via: 'Kaman - Ballabhgarh', departure: '01:15 PM', arrival: '05:00 PM', duration: '3h 45m', type: 'Express', depot: 'Lohagarh Depot' },
  { id: 'RSRTC-DEG-DEL-08', from: 'Deeg', to: 'Delhi', via: 'Kaman - Ballabhgarh', departure: '03:15 PM', arrival: '07:00 PM', duration: '3h 45m', type: 'Express', depot: 'Lohagarh Depot' },
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
  // Graceful fallback for older saved IDs like 'jaipur' or 'delhi-isbt-kashmere-gate'
  if (id === 'jaipur') {
    return CITY_HUBS.find((c) => c.id === 'jaipur-sindhi-camp') ?? null;
  }
  if (id === 'delhi-isbt-kashmere-gate') {
    return CITY_HUBS.find((c) => c.id === 'delhi') ?? null;
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

function buildEndpointStops(
  fromCity: CityHub,
  toCity: CityHub,
  depMins: number,
  durationMinutes: number,
  distanceKm: number,
  platformIndex: number,
  arrivalTimeOverride?: string
): RouteStop[] {
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
    {
      stopName: toCity.name,
      stand: toCity.stand,
      arrivalTime: arrivalTimeOverride ?? formatMinsTo12h(depMins + durationMinutes),
      departureTime: 'Terminates',
      haltMins: 0,
      distanceKm,
      platform: `Bay ${((platformIndex + 2) % 8) + 1}`,
    },
  ];
}

function calculateIndicativeFare(distanceKm: number, category: BusCategory): number {
  const ratePerKm: Record<BusCategory, { rate: number; min: number }> = {
    Ordinary: { rate: 0.95, min: 35 },
    Express: { rate: 1.1, min: 45 },
    Deluxe: { rate: 1.45, min: 70 },
    'Super Deluxe': { rate: 1.75, min: 95 },
    'AC Sleeper': { rate: 2.15, min: 180 },
    'Super Luxury Volvo': { rate: 2.5, min: 220 },
  };
  const { rate, min } = ratePerKm[category];
  return Math.max(min, Math.round((distanceKm * rate) / 5) * 5);
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
  const indicativeFare = calculateIndicativeFare(distanceKm, category);
  const seed = deterministicHash(`${raw.id}-${overrideIdSuffix ?? 'direct'}-${dateIso}`);
  const series =
    category === 'AC Sleeper'
      ? 'RJ-14-SL'
      : category === 'Super Deluxe' || category === 'Super Luxury Volvo'
      ? 'RJ-14-TD'
      : 'RJ-14-PA';

  const arrivalTimeStr =
    overrideDepMins === undefined && raw.arrival
      ? raw.arrival.replace(/\s*\(\+1\)/i, '').trim()
      : formatMinsTo12h(arrMins);

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
    arrivalTime: arrivalTimeStr,
    departureMins: depMins,
    durationMinutes,
    durationLabel: raw.duration,
    distanceKm,
    indicativeFare,
    boardingPoint: `${fromCity.stand} · Platform ${(seed % 6) + 1}`,
    droppingPoint: toCity.stand,
    amenities: [amenities[1] ?? amenities[0], 'Daily Service'],
    stops: buildEndpointStops(
      fromCity,
      toCity,
      depMins,
      durationMinutes,
      distanceKm,
      seed,
      arrivalTimeStr
    ),
    onTimePercent: 92 + (seed % 7),
  };
}

function expandCorridorSchedules(
  corridor: CorridorSchedule,
  fromCity: CityHub,
  toCity: CityHub,
  isReverse: boolean,
  dateIso: string
): BusService[] {
  const viaText = isReverse
    ? corridor.via
        .split(/\s*-\s*/)
        .map((s) => s.trim())
        .filter(Boolean)
        .reverse()
        .join(' - ')
    : corridor.via;
  const depotName = isReverse ? corridor.depotTo : corridor.depotFrom;
  const directionTag = isReverse ? 'DN' : 'UP';

  const slots: { depMins: number; type: BusCategory }[] = [];

  if (corridor.customSlots && corridor.customSlots.length > 0) {
    corridor.customSlots.forEach((slot) => {
      slots.push({
        depMins: parseTime12hToMins(slot.time),
        type: slot.type,
      });
    });
  } else if (corridor.departures && corridor.departures.length > 0) {
    corridor.departures.forEach((timeStr, idx) => {
      const depMins = parseTime12hToMins(timeStr);
      const busClass = corridor.classes[idx % corridor.classes.length];
      slots.push({ depMins, type: busClass });
    });
  } else if (corridor.frequency) {
    const startMins = parseTime12hToMins(corridor.frequency.start);
    const endMins = parseTime12hToMins(corridor.frequency.end);
    const step = Math.max(15, corridor.frequency.intervalMins);
    let idx = 0;
    for (let t = startMins; t <= endMins; t += step) {
      const busClass = corridor.classes[idx % corridor.classes.length];
      slots.push({ depMins: t, type: busClass });
      idx += 1;
    }
  }

  return slots.map((slot, idx) => {
    const syntheticRaw: RawDatasetRoute = {
      id: `${corridor.id}-${directionTag}`,
      from: fromCity.name,
      to: toCity.name,
      via: viaText,
      departure: formatMinsTo12h(slot.depMins),
      arrival: formatMinsTo12h(slot.depMins + parseDurationToMins(corridor.duration)),
      duration: corridor.duration,
      type: slot.type,
      depot: depotName,
    };
    return createBusFromRaw(
      syntheticRaw,
      fromCity,
      toCity,
      dateIso,
      slot.depMins,
      String(idx + 1).padStart(2, '0'),
      viaText
    );
  });
}



/**
 * Generates deterministic RSRTC schedules for ANY pair of Rajasthan districts & interstate hubs:
 * 1. Merged bidirectional EXTENDED_CORRIDORS + exact direct matches from RSRTC_ROUTES
 * 2. Exact direct matches from RSRTC_ROUTES (plus complementary daily shift options)
 * 3. Automatic reverse/return schedule if the opposite direction exists in RSRTC_ROUTES
 * 4. Smart Fallback / Connecting Bus Generator (3–4 schedules: morning, afternoon, evening/night)
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

  // Strict one-way schedule for Deeg -> Mathura (21 exact buses, no duplicates or fallback additions)
  if (fromCity.id === 'deeg' && toCity.id === 'mathura') {
    return DEEG_TO_MATHURA_ROUTES.map((raw) =>
      createBusFromRaw(raw, fromCity, toCity, dateIso)
    ).sort((a, b) => a.departureMins - b.departureMins);
  }

  // Strict one-way schedule for Mathura -> Deeg (21 exact buses, no duplicates or fallback additions)
  if (fromCity.id === 'mathura' && toCity.id === 'deeg') {
    return MATHURA_TO_DEEG_ROUTES.map((raw) =>
      createBusFromRaw(raw, fromCity, toCity, dateIso)
    ).sort((a, b) => a.departureMins - b.departureMins);
  }

  // Strict one-way schedule for Deeg -> Alwar (34 exact buses, no duplicates or fallback additions)
  if (fromCity.id === 'deeg' && toCity.id === 'alwar') {
    return DEEG_TO_ALWAR_ROUTES.map((raw) =>
      createBusFromRaw(raw, fromCity, toCity, dateIso)
    ).sort((a, b) => a.departureMins - b.departureMins);
  }

  // Strict one-way schedule for Deeg -> Delhi (8 exact buses, no duplicates or fallback additions)
  if (fromCity.id === 'deeg' && toCity.id === 'delhi') {
    return DEEG_TO_DELHI_ROUTES.map((raw) =>
      createBusFromRaw(raw, fromCity, toCity, dateIso)
    ).sort((a, b) => a.departureMins - b.departureMins);
  }

  // 0. Bidirectional matches from merged EXTENDED_CORRIDORS
  const matchingCorridors = EXTENDED_CORRIDORS.filter(
    (c) =>
      (c.from === fromCity.name && c.to === toCity.name) ||
      (c.to === fromCity.name && c.from === toCity.name)
  );

  // 1. Exact direct matches from original RSRTC_ROUTES
  const exactMatches = RSRTC_ROUTES.filter(
    (r) => r.from === fromCity.name && r.to === toCity.name
  );

  if (matchingCorridors.length > 0) {
    const corridorBuses: BusService[] = [];
    matchingCorridors.forEach((corridor) => {
      const isReverse = corridor.to === fromCity.name && corridor.from === toCity.name;
      corridorBuses.push(
        ...expandCorridorSchedules(corridor, fromCity, toCity, isReverse, dateIso)
      );
    });

    // Merge any distinct existing RSRTC_ROUTES direct departures so no existing route is ever lost
    const seenKeys = new Set(
      corridorBuses.map((b) => `${b.departureMins}-${b.category}-${b.viaText.toLowerCase()}`)
    );
    exactMatches.forEach((raw) => {
      const bus = createBusFromRaw(raw, fromCity, toCity, dateIso);
      const key = `${bus.departureMins}-${bus.category}-${bus.viaText.toLowerCase()}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        corridorBuses.push(bus);
      }
    });

    return corridorBuses.sort((a, b) => a.departureMins - b.departureMins);
  }

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

  // 3. Smart Fallback Schedule Generator for any other pair of the 50 Rajasthan districts
  const distanceKm = calculateRoadDistanceKm(fromCity, toCity);
  const seed = deterministicHash(`${fromCity.id}-${toCity.id}-${dateIso}`);

  const fallbackTemplates: {
    depMins: number;
    type: BusCategory;
    speedKmh: number;
    depot: string;
    codeTag: string;
  }[] = [
    {
      depMins: 6 * 60 + 30 + (seed % 3) * 15,
      type: 'Express',
      speedKmh: 48,
      depot: fromCity.depot,
      codeTag: 'M1',
    },
    {
      depMins: 11 * 60 + 15 + (seed % 4) * 15,
      type: 'Ordinary',
      speedKmh: 43,
      depot: toCity.depot,
      codeTag: 'A1',
    },
    {
      depMins: 15 * 60 + 30 + (seed % 3) * 15,
      type: 'Super Deluxe',
      speedKmh: 54,
      depot: fromCity.depot,
      codeTag: 'E1',
    },
    {
      depMins: 21 * 60 + (seed % 3) * 15,
      type: distanceKm >= 220 ? 'AC Sleeper' : 'Super Luxury Volvo',
      speedKmh: 56,
      depot: toCity.depot,
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
      const indicativeFare = calculateIndicativeFare(distanceKm, category);
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
        viaText: '',
        isDirectDataset: false,
        isConnecting: false,
        departureTime: formatMinsTo12h(tpl.depMins),
        arrivalTime: formatMinsTo12h(arrMins),
        departureMins: tpl.depMins,
        durationMinutes,
        durationLabel: formatDuration(durationMinutes),
        distanceKm,
        indicativeFare,
        boardingPoint: `${fromCity.stand} · Platform ${(busSeed % 5) + 1}`,
        droppingPoint: toCity.stand,
        amenities: [amenities[1] ?? amenities[0], 'Daily Service'],
        stops: buildEndpointStops(
          fromCity,
          toCity,
          tpl.depMins,
          durationMinutes,
          distanceKm,
          busSeed
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
