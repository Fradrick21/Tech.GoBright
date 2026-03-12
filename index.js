// Review Button
(function () {
      var cards = Array.from(document.querySelectorAll(".review-item"));
      var countText = document.getElementById("reviewCountText");
      var loadBtn = document.getElementById("loadMoreReviews");
      var initialVisible = 6;
      var step = 3;
      var visibleCount = initialVisible;

      function renderReviews() {
        var total = cards.length;
        cards.forEach(function (card, index) {
          card.classList.toggle("hidden-review", index >= visibleCount);
        });

        var shown = Math.min(visibleCount, total);
        countText.textContent = "Showing " + shown + " out of " + total;

        if (shown >= total) {
          loadBtn.style.display = "none";
        } else {
          loadBtn.style.display = "inline-flex";
        }
      }

      loadBtn.addEventListener("click", function () {
        visibleCount += step;
        renderReviews();
      });

      renderReviews();
    })();