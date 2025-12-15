export enum DeliveryArea {
  HELWAN = "HELWAN",
  FISAL = "FISAL",
  HARAM = "HARAM",
  MAADI = "MAADI",
  DOKKI = "DOKKI",
  ZAMALEK = "ZAMALEK",
  IMBABA = "IMBABA",
  ROD_ELFARAG = "ROD_ELFARAG",
  NASR_CITY = "NASR_CITY",
}

export const deliveryAreaPrices: Record<DeliveryArea, number> = {
  [DeliveryArea.HELWAN]: 30.0,
  [DeliveryArea.FISAL]: 40.0,
  [DeliveryArea.HARAM]: 50.0,
  [DeliveryArea.MAADI]: 60.0,
  [DeliveryArea.DOKKI]: 70.0,
  [DeliveryArea.ZAMALEK]: 80.0,
  [DeliveryArea.IMBABA]: 120.0,
  [DeliveryArea.ROD_ELFARAG]: 90.0,
  [DeliveryArea.NASR_CITY]: 100.0,
};

export const deliveryAreaLabels: Record<DeliveryArea, string> = {
  [DeliveryArea.HELWAN]: "Helwan",
  [DeliveryArea.FISAL]: "Fisal",
  [DeliveryArea.HARAM]: "Haram",
  [DeliveryArea.MAADI]: "Maadi",
  [DeliveryArea.DOKKI]: "Dokki",
  [DeliveryArea.ZAMALEK]: "Zamalek",
  [DeliveryArea.IMBABA]: "Imbaba",
  [DeliveryArea.ROD_ELFARAG]: "Rod El Farag",
  [DeliveryArea.NASR_CITY]: "Nasr City",
};
