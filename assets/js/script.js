let pageTitle = document
  .querySelector("title")
  .innerHTML.replace("EPL Football | ", "")

// loading js page vise
if (pageTitle == "Login") index()
if (pageTitle == "Home") home()
if (pageTitle == "Clubs List") clubsList()
if (pageTitle == "Match Details") matchDetails()
if (pageTitle == "Access Denied") accessDenied()

// static login id and password
let username = "admin"
let password = 123456

// calling id pass from local storage
let userSto = localStorage.key(0)
let passSto = localStorage.getItem("admin")

// Index or Login page js func
function index() {
  // login check
  window.onload = function ifLogin() {
    if (username == userSto && password == passSto) {
      window.open("home.html", "_self")
    }
  }
  let uname = document.querySelector(".username")
  let pass = document.querySelector(".password")
  let logForm = document.querySelector("form")

  let userErr = document.querySelector(".user-err")
  let passErr = document.querySelector(".pass-err")
  let isValid = validateForm()

  // login submit
  logForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (isValid == true) {
      if (uname.value == username && pass.value == password) {
        localStorage.setItem(uname.value, pass.value)
        window.open("home.html", "_self")
      }
    }
    if (uname.value == "" || uname.value !== username) {
      userErr.innerText = "*Please enter the valid Username"
    }
    if (pass.value == "" || pass.value !== password) {
      passErr.innerText = "*Please enter the valid Password"
    }
  })

  // login validation
  function validateForm() {
    uname.addEventListener("blur", () => {
      if (/^([a-zA-Z]){5}$/.test(uname.value)) {
        userErr.innerText = " "
        isValid = true
      } else {
        userErr.innerText = "*Please enter the valid Username"
        isValid = false
      }
    })

    pass.addEventListener("blur", () => {
      if (/^([0-9]){6}$/.test(pass.value)) {
        passErr.innerText = " "
        isValid = true
      } else {
        passErr.innerText = "*Please enter the valid Password"
        isValid = false
      }
    })
  }
}

// Home page js func
function home() {
  // login check
  window.onload = function ifLogin() {
    if (username !== userSto && password !== passSto) {
      window.open("accessdenied.html", "_self")
    }
  }
  // logout
  let logout = document.querySelector(".logout")
  logout.addEventListener("click", () => {
    localStorage.clear()
    window.open("index.html", "_self")
  })

  // hamburger icon change
  let hamburger = document.querySelector(".hamburger")
  hamburger.addEventListener("click", function () {
    this.classList.toggle("change")
    document.querySelector(".navigation").classList.toggle("display-block")
  })

  // slick slider
  $(".slider").slick()

  let preImg = document.getElementsByClassName("pre-img")
  let durImg = document.getElementsByClassName("dur-img")
  let postImg = document.getElementsByClassName("post-img")

  let buttons = document.querySelectorAll(".btns button")

  // match photos func
  for (let btn of buttons) {
    btn.addEventListener("click", () => {
      if (btn.value == "pre") {
        pre()
      }
      if (btn.value == "dur") {
        dur()
      }
      if (btn.value == "post") {
        post()
      }
    })
  }

  function pre() {
    for (i = 0; i < preImg.length; i++) {
      preImg[i].style.display = "block"
    }
    for (i = 0; i < durImg.length; i++) {
      durImg[i].style.display = "none"
    }
    for (i = 0; i < postImg.length; i++) {
      postImg[i].style.display = "none"
    }
  }

  function dur() {
    for (i = 0; i < preImg.length; i++) {
      preImg[i].style.display = "none"
    }
    for (i = 0; i < durImg.length; i++) {
      durImg[i].style.display = "block"
    }
    for (i = 0; i < postImg.length; i++) {
      postImg[i].style.display = "none"
    }
  }

  function post() {
    for (i = 0; i < preImg.length; i++) {
      preImg[i].style.display = "none"
    }
    for (i = 0; i < durImg.length; i++) {
      durImg[i].style.display = "none"
    }
    for (i = 0; i < postImg.length; i++) {
      postImg[i].style.display = "block"
    }
  }
}

// clublist page js func
function clubsList() {
  //login check
  window.onload = function ifLogin() {
    if (username !== userSto && password !== passSto) {
      window.open("accessdenied.html", "_self")
    }
    matchApi()
  }
  // logout
  let logout = document.querySelector(".logout")
  logout.addEventListener("click", () => {
    localStorage.clear()
    window.open("index.html", "_self")
  })

  // humberger icon change
  let hamburger = document.querySelector(".hamburger")

  hamburger.addEventListener("click", function () {
    this.classList.toggle("change")
    document.querySelector(".navigation").classList.toggle("display-block")
  })

  let clubsData
  let matchData

  // addevent to select
  let clubLists = document.querySelector(".clubs")
  clubLists.addEventListener("input", selectClub)

  let teamN = sessionStorage.getItem("team")
  let selOpt = document.querySelector(".clubs option:nth-child(1)")
  selOpt.value = teamN
  selOpt.innerText = teamN

  // calling clublist api
  const clubXhr = new XMLHttpRequest()

  clubXhr.open(
    "GET",
    "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
    true
  )

  clubXhr.onload = function () {
    clubsData = JSON.parse(this.response)
    display()
  }

  clubXhr.send()

  // calling matchday api
  function matchApi() {
    const matchXhr = new XMLHttpRequest()

    matchXhr.open(
      "GET",
      "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
      true
    )

    matchXhr.onload = function () {
      matchData = JSON.parse(this.response)
      selectClub()
    }

    matchXhr.send()
  }

  // func to display option in select
  function display() {
    let allClubs = clubsData.clubs
    for (i = 0; i < allClubs.length; i++) {
      let clubsName = allClubs[i].name
      let clubN = document.createElement("option")
      clubN.value = allClubs[i].name
      let clubnxt = document.createTextNode(clubsName)
      clubN.appendChild(clubnxt)
      clubLists.appendChild(clubN)
    }
  }

  // func to add and remove data from table
  function selectClub() {
    let tabLi = document.querySelectorAll(".data-table li")
    if (tabLi.length > 1) {
      for (i = 1; i < tabLi.length; i++) {
        tabLi[i].remove()
      }
    }
    let displayTable = document.querySelector(".data-table")
    let loadMore = document.querySelector(".load-more")
    loadMore.addEventListener("click", loadData)
    let j = 0
    let matchDay = matchData.matches
    let clubInfo = []
    for (i = 0; i < matchDay.length; i++) {
      clubInfo = matchDay.filter(function (el) {
        return el.team1 == clubLists.value || el.team2 == clubLists.value
      })
    }
    if (clubInfo.length == 0) {
      document.querySelector(".no-data").innerText =
        "No data to diaplay Please select the club"
    }
    if (clubInfo.length > 0) {
      document.querySelector(".no-data").innerText = ""
    }
    loadData()

    // func to display data in table
    function loadData() {
      for (i = 0; i <= 4; i++) {
        if (j !== 0) {
          if (j >= clubInfo.length) {
            document.querySelector(".no-data").innerText =
              "NO more data to diaplay!"
            loadMore.style.display = "none"
          }
        }
        let round = clubInfo[j].round
        let date = clubInfo[j].date
        let teamA = clubInfo[j].team1
        let teamB = clubInfo[j].team2
        let score = clubInfo[j].score.ft
        let scoreA = score[0]
        let scoreB = score[1]

        let row = document.createElement("li")
        let rCell = document.createElement("span")
        rCell.innerText = round
        rCell.setAttribute("data-label", "Round")
        let dCell = document.createElement("span")
        dCell.innerText = date
        dCell.setAttribute("data-label", "Date")
        let teamAS = document.createElement("span")
        teamAS.innerText = teamA + " : " + scoreA
        teamAS.setAttribute("data-label", "Team A Score")
        let teamBS = document.createElement("span")
        teamBS.innerText = teamB + " : " + scoreB
        teamBS.setAttribute("data-label", "Team B Score")

        row.appendChild(rCell)
        row.appendChild(dCell)
        row.appendChild(teamAS)
        row.appendChild(teamBS)
        displayTable.appendChild(row)
        j++
      }
    }
  }
  sessionStorage.clear()
}

// match details page js func
function matchDetails() {
  // login check
  window.onload = function ifLogin() {
    if (username !== userSto && password !== passSto) {
      window.open("accessdenied.html", "_self")
    }
  }
  // logout
  let logout = document.querySelector(".logout")
  logout.addEventListener("click", () => {
    localStorage.clear()
    window.open("index.html", "_self")
  })

  // hamburger icon change
  let hamburger = document.querySelector(".hamburger")

  hamburger.addEventListener("click", function () {
    this.classList.toggle("change")
    document.querySelector(".navigation").classList.toggle("display-block")
  })

  // addevent to select
  let matchList = document.querySelector(".match")
  matchList.addEventListener("input", match)

  // calling matchday api
  const matchdayXhr = new XMLHttpRequest()

  matchdayXhr.open(
    "GET",
    "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
    true
  )

  matchdayXhr.onload = function () {
    matchdayData = JSON.parse(this.response)
    disMatchday()
  }

  matchdayXhr.send()

  // func to display option in select
  function disMatchday() {
    let matchDay = matchdayData.matches
    for (i = 0; i < matchDay.length; i += 10) {
      let mDay = matchDay[i].round
      let matchD = document.createElement("option")
      matchD.value = matchDay[i].round
      matchD.innerText = mDay
      matchList.appendChild(matchD)
    }
  }

  // func to add and remove data from table
  function match() {
    let tabLi = document.querySelectorAll(".match-tab li")
    if (tabLi.length > 1) {
      for (i = 1; i < tabLi.length; i++) {
        tabLi[i].remove()
      }
    }
    let displayTable = document.querySelector(".match-tab")
    let loadMore = document.querySelector(".load-more")
    loadMore.addEventListener("click", loadData)
    let j = 0
    let matchDay = matchdayData.matches
    for (i = 0; i < matchDay.length; i++) {
      var matchInfo = matchDay.filter(function (el) {
        return el.round == matchList.value
      })
    }
    loadData()

    // func to display data in table
    function loadData() {
      for (i = 0; i <= 4; i++) {
        if (j >= matchInfo.length) {
          document.querySelector(".no-data").innerText =
            "NO more data to diaplay!"
          loadMore.style.display = "none"
        }
        let round = matchInfo[j].round
        let date = matchInfo[j].date
        let teamA = matchInfo[j].team1
        let teamB = matchInfo[j].team2
        let score = matchInfo[j].score.ft
        let scoreA = score[0]
        let scoreB = score[1]

        let row = document.createElement("li")
        let rCell = document.createElement("span")
        rCell.innerText = round
        rCell.setAttribute("data-label", "Round")
        let dCell = document.createElement("span")
        dCell.innerText = date
        dCell.setAttribute("data-label", "Date")
        let teamAcell = document.createElement("span")
        let teamAS = document.createElement("a")
        teamAS.href = "clublist.html"
        teamAS.addEventListener("click", () => {
          sessionStorage.setItem("team", teamA)
        })
        teamAS.innerText = teamA + " : " + scoreA
        teamAcell.setAttribute("data-label", "Team A Score")
        let teamBcell = document.createElement("span")
        let teamBS = document.createElement("a")
        teamBS.href = "clublist.html"
        teamBS.addEventListener("click", () => {
          sessionStorage.setItem("team", teamB)
        })
        teamBS.innerText = teamB + " : " + scoreB
        teamBcell.setAttribute("data-label", "Team B Score")

        teamAcell.appendChild(teamAS)
        teamBcell.appendChild(teamBS)
        row.appendChild(rCell)
        row.appendChild(dCell)
        row.appendChild(teamAcell)
        row.appendChild(teamBcell)
        displayTable.appendChild(row)
        j++
      }
    }
  }
}

function accessDenied() {}
