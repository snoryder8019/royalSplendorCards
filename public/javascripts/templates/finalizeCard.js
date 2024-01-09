function createCardTemplate(card, user) {
  const realNameDiv = (isStacked) => {
      const nameDisplay = user && user.firstName ? `${user.firstName}${isStacked ? "<br>" : " "}${user.lastName}` : "firstname" + (isStacked ? "<br>lastname" : " lastname");
      return `
          <div id="realName_${card._id}" style="position:absolute; top:${card.text1PositionY}px; left:${card.text1PositionX}px;" class="realName">
              <div id="realNameText_${card._id}" class="font_${card.fontName1}" style="font-size:${card.font1Size}px; color:${card.text1Color};">${nameDisplay}</div>
          </div>
      `;
  };
    function fontSizeButtons(targetId) {
        return `
            <button onclick="adjustFontSize('${targetId}', 1)">Increase Font Size</button>
            <button onclick="adjustFontSize('${targetId}', -1)">Decrease Font Size</button>
        `;
    }
  const userDetails = `
      <div class="font_${card.fontName1}">Chapter</div><div>:</div><div class="font_${card.fontName2}">${user.chapter}</div>
      <div class="font_${card.fontName1}">Address</div><div>:</div><div class="font_${card.fontName2}">${user.address}</div> 
      <div class="font_${card.fontName1}">Email</div><div>:</div><div class="font_${card.fontName2}">${user.email}</div> 
      <div class="font_${card.fontName1}">Phone</div><div>:</div><div class="font_${card.fontName2}">${user.phone}</div> 
      <div class="font_${card.fontName1}">Birthday</div><div>:</div><div class="font_${card.fontName2}">${user.birthday_month} ${user.birthday_day}</div>
  `;

  const cardImgClass = card.vertical === "false" ? "cardImg" : "cardImg_vertical";
  const realNameContent = card.nameStack === "false" ? realNameDiv(false) : card.nameStack === "true" ? realNameDiv(true) : "";

  return `
      <div class="card">         
          ${card.cardName}
          <div class="cardFrontFrame">
          <div id="frontFrame_${card._id}" class="${cardImgClass}">
              ${realNameContent}
              <div id="royalTitle_${card._id}" style="position:absolute; top:${card.text2PositionY}px; left:${card.text2PositionX}px;" class="royalTitle">
                  <div id="royalTitleText_${card._id}" style="word-wrap: normal; max-width: 125px; font-size:${card.font2Size}px; color:${card.text1Color}" class="font_${card.fontName2}">${user.title}</div>
              </div>
              <img src="${card.cardFront}" alt="Card Front">
              <div id="headshot_${card._id}" class="headshot">
                  <img class="headshot" style="position:absolute; transform: translateY(${card.imgPositionY}px) translateX(${card.imgPositionX}px) scale(${card.imgScale});" src="/images/userHeadshots/${user.userImg}" alt="Headshot">
              </div>
          </div>
          </div>
         
          <div class="cardBackFrame">
              <div class="${cardImgClass}">
                  <img src="${card.cardBack}" alt="Card Back">
                  <div style="position:absolute; transform: translateY(${card.text0PositionY}px) translateX(${card.text0PositionX}px) rotate(${card.text0Rotation}deg);" class="textBox" id="textBox_${card._id}">
                      <div id="textTitles_${card._id}" style="font-size:${card.font0Size}px; color:${card.textColor}" class="textTitles">
                          ${userDetails}
                      </div>                
                  </div>              
              </div>
          </div>
      </div>
  `;
}
export { createCardTemplate }
