;(() => {
  let pH = window.innerHeight
  let doAnimationOpen = false

  window.addEventListener('resize', () => {
    pH = window.innerHeight

    changeSizeMenu(true)
  })

  const openBtn = document.querySelector('.js-menu-open-button')
  const closeBtn = document.querySelector('.js-menu-close-button')
  const menuPlate = document.querySelector('#menu')
  const menuContent = menuPlate?.querySelector('.js-menu-content')

  function changeSizeMenu(is) {
    menuPlate.style.height = `${is ? pH : 0}px`
  }

  function toggleMenu() {
    if (doAnimationOpen) return
    const isActive = !menuPlate.classList.contains('menu__opened')

    doAnimationOpen = true

    if (!isActive) {
      menuContent.style.opacity = '0'
    }

    if (isActive) {
      menuPlate.style.display = 'block'
    }

    menuPlate.animate([
      {
        height: '0',
        opacity: 0
      },
      {
        height: `${pH}px`,
        opacity: 1
      }
    ], {
      duration: 300,
      direction: isActive ? 'normal' : 'reverse'
    }).onfinish = function() {
      changeSizeMenu(isActive)

      doAnimationOpen = false
      if (!isActive) {
        menuPlate.style.display = 'none'
      }

      openBtn.classList[isActive ? 'add' : 'remove']('menu__button_opening')

      menuContent.style.opacity = isActive ? '1' : '0'
      menuPlate.style.opacity = isActive ? '1' : '0'
    }

    menuPlate.classList[isActive ? 'add' : 'remove']('menu__opened')


  }

  if (menuPlate) {
    openBtn.addEventListener('click', toggleMenu)
    closeBtn.addEventListener('click', toggleMenu)
  }
})()
