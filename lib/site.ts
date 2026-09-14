export const SITE_URL = "https://dmitriicherviakov.com";

export const site = {
  name: "Dmitrii Cherviakov",
  givenName: "Dmitrii",
  familyName: "Cherviakov",
  handle: "dimkoy",
  jobTitle: "Senior iOS Developer",
  location: { city: "Barcelona", country: "Spain", countryCode: "ES" },
  email: "dimkoy01@gmail.com",
  github: "https://github.com/dimkoy",
  linkedin: "https://www.linkedin.com/in/dmitrii-cherviakov/",
  cvPath: "/CV-Cherviakov.pdf",
  ogImage: "/og/default.png",
  photo: { path: "/photo/dmitrii-cherviakov.jpg", width: 800, height: 800 },
  photoSmall: { path: "/photo/dmitrii-cherviakov-400.jpg", width: 400, height: 400 },
  /** IndexNow key — public by protocol design; the same value lives in public/<key>.txt */
  indexNowKey: "b513204032d36990bc9f5db54b93019a",
} as const;
