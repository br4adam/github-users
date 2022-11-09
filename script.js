const searchBar = document.createElement("input")
searchBar.id = "searchbar"
searchBar.setAttribute("placeholder", "search")
document.getElementById("root").append(searchBar)
const cardsSection = document.createElement("section")
cardsSection.id = "cards"
const topMessage = document.createElement("p")
topMessage.id = "message"
topMessage.innerText = "Loading..."
document.getElementById("root").append(topMessage)
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
  topMessage.style.display = "none"
  showMoreButtonsHandler()
}

let visibleUsersCount

const filterUsers = (e) => {
  const inputValue = e.target.value
  const userCards = document.querySelectorAll(".usercard")
  visibleUsersCount = 0
  for (const card of userCards) {
    const isVisible = card.childNodes[1].innerText.includes(inputValue)
    if (!isVisible) 
      card.style.display = "none"
    else {
      card.style.display = "flex"
      visibleUsersCount++
    }
  }
  if (visibleUsersCount === 0) {
    topMessage.style.display = "block"
    topMessage.innerText = "Nothing found"
  }
  else topMessage.style.display = "none"
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
  showButtons.forEach((button) => {
    button.addEventListener("click", showMoreData)
  })
}

searchBar.addEventListener("input", filterUsers)
window.addEventListener("load", renderUsers)