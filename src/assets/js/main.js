(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  // $(window).scroll(function () {
  //   if ($(this).scrollTop() > 40) {
  //     $(".navbar").addClass("sticky-top");
  //   } else {
  //     $(".navbar").removeClass("sticky-top");
  //   }
  // });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Image comparison ----------------->
  // $(".twentytwenty-container").twentytwenty({});

  // Image comparison ------------------>
  // $(".price-carousel").owlCarousel({
  //   autoplay: true,
  //   smartSpeed: 1500,
  //   margin: 45,
  //   dots: false,
  //   loop: true,
  //   nav: true,
  //   navText: [
  //     '<i class="bi bi-arrow-left"></i>',
  //     '<i class="bi bi-arrow-right"></i>',
  //   ],
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 2,
  //     },
  //   },
  // });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });
})(jQuery);
//-------------------------
<OwlCarousel
  className="owl-theme price-carousel"
  items="2"
  autoplay={true}
  loop
  dots={false}
  smartSpeed="1000"
  nav={true}
  autoplayHoverPause
  navText={[
    `<i class="bi bi-arrow-left"></i>`,
    `<i class="bi bi-arrow-right"></i>`,
  ]}
  responsive={{
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
  }}
>
  {pricingContent.pricingPlans.map((plan, index) => (
    <div key={index} className="item me-3 ms-3 mb-4">
      <div className="position-relative">
        <img
          className="img-fluid rounded-top"
          src={priceImg}
          alt="price plans"
        />
        <div
          className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle"
          style={{ zIndex: 2 }}
        >
          <h2 className="text-primary m-0">{plan.Price}</h2>
        </div>
      </div>
      <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
        <h4>{plan.Title}</h4>
        <hr className="text-primary w-50 mx-auto mt-0" />
        {plan.Benefits.map((benefit, index) => (
          <div key={index} className="d-flex justify-content-between mb-3">
            <span>{benefit.Benefit}</span>
            <i className="fa fa-check text-primary pt-1" />
          </div>
        ))}
        <a
          href="appointment.html"
          className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle"
        >
          Appointment
        </a>
      </div>
    </div>
  ))}
</OwlCarousel>;
