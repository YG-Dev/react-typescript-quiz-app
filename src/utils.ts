export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);  // By Thomas Weibenfalk

export const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('span');

  function decodeHTMLEntities (str: string | null) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})(); // By Robert K stackoverflow.com/users/24950/robert-k