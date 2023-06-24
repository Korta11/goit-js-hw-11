import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function errorGet({ code, response }) {
  console.log(response);
  Report.failure(`${code}`, `${response.data}`, 'OK', {
    width: '500px',
    messageFontSize: '18px',
    titleFontSize: '35px',
    svgSize: '70px',
    backOverlayClickToClose: true,
  });
}

function infoOnRequest() {
  Report.info(
    'SORRY',
    '"There are no images matching your search query. <br/><br/>Please try again"',
    'OK',
    {
      width: '500px',
      messageFontSize: '25px',
      titleFontSize: '35px',
      svgSize: '70px',
      backOverlayClickToClose: true,
    }
  );
}

function infoCorrectRequest(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    position: 'center-center',
    width: '500px',
    fontSize: '30px',
    timeout: '1700',
    backOverlayColor: (0, 0, 0, 0.7),
    useIcon: false,
  });
}

function infoEndGallery() {
  Notify.info(`WE'RE SORRY, BUT YOU'VE REACHED THE END OF SEARCH RESULTS`, {
    position: 'center-center',
    width: '500px',
    fontSize: '30px',
    timeout: '1700',
    useIcon: false,
  });
}

export { errorGet, infoOnRequest, infoCorrectRequest, infoEndGallery };
