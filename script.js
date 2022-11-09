const searchBar = document.createElement("input")
searchBar.id = "searchbar"
searchBar.setAttribute("placeholder", "search")
document.getElementById("root").append(searchBar)
const cardsSection = document.createElement("section")
cardsSection.id = "cards"
document.getElementById("root").append(cardsSection)

const getData = async () => {
  let response = await fetch("https://api.github.com/users")
  let data = await response.json()
  return data
}

const createUserCard = (user) => {
  const userCard = document.createElement("div")
  userCard.classList.add("usercard")
  const userImage = document.createElement("img")
  userImage.src = user.avatar_url
  userCard.append(userImage)
  const userName = document.createElement("p")
  userName.innerText = user.login
  userCard.append(userName)
  const showButton = document.createElement("button")
  showButton.innerText = "Show more"
  userCard.append(showButton)
  const moreData = document.createElement("div")
  const userRank = document.createElement("p")
  userRank.innerText = `Rank: ${user.type}`
  moreData.append(userRank)
  const userAdmin = document.createElement("p")
  userAdmin.innerText = `Admin: ${user.site_admin}`
  moreData.append(userAdmin)
  moreData.style.display = "none"
  userCard.append(moreData)
  cardsSection.append(userCard)
}

const renderUsers = async () => {
  let users = await getData()
  console.log(users)
  users.forEach((user) => createUserCard(user))
  showMoreButtonsHandler()
}

const filterUsers = (e) => {
  const inputValue = e.target.value
  const userCards = document.querySelectorAll(".usercard")
  for (const card of userCards) {
    console.log(card)
    const isVisible = card.childNodes[1].innerText.includes(inputValue)
    if (!isVisible) card.style.display = "none"
    else card.style.display = "flex"
  }
}

const showMoreData = (e) => {
  const button = e.target
  if (button.innerText === "Show more") {
    button.innerText = "Show less"
    button.nextSibling.style.display = "block"
  }
  else {
    button.innerText = "Show more"
    button.nextSibling.style.display = "none"
  }
}

const showMoreButtonsHandler = () => {
  const showButtons = document.querySelectorAll("button")
  console.log(showButtons)
  showButtons.forEach((button) => {
    button.addEventListener("click", showMoreData)
  })
}

searchBar.addEventListener("input", filterUsers)
window.addEventListener("load", renderUsers)