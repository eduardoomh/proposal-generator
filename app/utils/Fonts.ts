import { Font } from "@react-pdf/renderer";

export function registerMontserratFonts() {
  Font.register({
    family: 'Montserrat',
    fonts: [
      {
        src: '/fonts/montserrat/Montserrat-Regular.ttf',
        fontWeight: 'normal',
      },
      {
        src: '/fonts/montserrat/Montserrat-Italic.ttf',
        fontStyle: 'italic',
      },
      {
        src: '/fonts/montserrat/Montserrat-Medium.ttf',
        fontWeight: 500,
      },
      {
        src: '/fonts/montserrat/Montserrat-SemiBold.ttf',
        fontWeight: 600,
      },
      {
        src: '/fonts/montserrat/Montserrat-Bold.ttf',
        fontWeight: 'bold',
      },
      {
        src: '/fonts/montserrat/Montserrat-ExtraBold.ttf',
        fontWeight: 800,
      },
      {
        src: '/fonts/montserrat/Montserrat-Black.ttf',
        fontWeight: 900,
      },
    ],
  })}