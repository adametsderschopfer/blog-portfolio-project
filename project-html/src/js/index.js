// LazyLoad
;(function () {
  // Set the options to make LazyLoad self-initialize
  window.lazyLoadOptions = {
    elements_selector: '.lazy',
    // ... more custom settings?
  }

  // Listen to the initialization event and get the instance of LazyLoad
  window.addEventListener(
    'LazyLoad::Initialized',
    function (event) {
      window.lazyLoadInstance = event.detail.instance
      window.lazyLoadInstance.update()
    },
    false
  )
})()

// SVG
;(function () {
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/svg4everybody/2.1.9/svg4everybody.min.js',
    function () {
      svg4everybody()
    }
  )
})()
