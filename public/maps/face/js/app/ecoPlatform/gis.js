var plantType = null;
var ids = [];
var isClick = false;


$("#expand").on("click", function () {
  $("#expand").hide();
  $(".imgFold").show(300);
  $(".listBox").show(300);
  isClick = true;

});
$("#fold").on("click", async function () {
  $(".imgFold").hide(300);
  $(".listBox").hide(300);
  $("#expand").show();
  isClick = false;

  Global.showingTyphoon = false;
});
$("#expand").hover(
  function () {
    $(this).addClass("animated tada");
  },
  function () {
    $(this).removeClass("animated tada");
  }
);
$("#fold").hover(
  function () {
    $(this).addClass("animated tada");
  },
  function () {
    $(this).removeClass("animated tada");
  }
);
