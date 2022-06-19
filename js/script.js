const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  selectTag = document.querySelectorAll("select"),
  exchangeIcon = document.querySelector(".exchange"),
  translateBtn = document.querySelector("button")

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    //Selecting English by default as FROM language and Hindi as TO language
    let selected
    if (id == 0 && country_code == "en-GB") {
      selected = "selected"
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected"
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
    tag.insertAdjacentHTML("beforeend", option) // adding options tag inside select tag
  }
})

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value
  fromText.value = toText.value
  toText.value = tempText
})

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value, //getting form slect tag value
    translateTo = selectTag[1].value //getting to slect tag value
  console.log(text, translateFrom, translateTo)
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
  //fetching api response and returning it with paring into js obj
  // and in another then method receiving that obj
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      toText.value = data.responseData.translatedText
    })
})
