$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    var name = $("input").val();

    $.ajax({
      url: `/name/${name}`,
      method: "GET",
      beforeSend: function () {
        $('.spinner-border').css('display', 'block');
      },
      success: function (data) {
        var mapData = [];
        console.log(data);
        $('.spinner-border').css('display', 'none');
        $('.info-div').css('display', 'block');
        $('.info__name').html(data.name_sanitized);

        data.age ? $('.info__age').html(data.age) : $('.info__age').html("Can't predict");
                
        var genderData = [{
          values: [],
          labels: [],
          type: 'pie'
        }];

        if (data.gender.gender == 'male') {
          genderData[0].values.push(data.gender.accuracy, 100 - data.gender.accuracy);
          genderData[0].labels.push('Male', 'Female');
        } else if (data.gender.gender == 'female') {
          genderData[0].values.push(100 - data.gender.accuracy, data.gender.accuracy);
          genderData[0].labels.push('Male', 'Female');
        } else {
          genderData = null;
        }

        var layout = {
          height: 400,
          width: 500
        };

        Plotly.setPlotConfig({ 
          mapboxAccessToken: 'pk.eyJ1Ijoia2dsb2dpbnMiLCJhIjoiY2syajRoc3FyMDJhNTNjcXBlZG5jZ3R0biJ9.4vRwSoou5h5oq1Ur7zvR9Q'
        });

        if (genderData) {
          Plotly.newPlot('info__gender', genderData, layout);
        } else {
          $('#info__gender').html('Can\' predict');
        }

        mapData = [{
          type: 'choropleth',
          locations: unpack(data.country, 'id'),
          z: unpack(data.country, 'probability'),
          text: unpack(data.country, 'name'),
          colorscale: [
            [0, 'rgb(5, 10, 172)'], [0.35, 'rgb(40, 60, 190)'],
            [0.5, 'rgb(70, 100, 245)'], [0.6, 'rgb(90, 120, 245)'],
            [0.7, 'rgb(106, 137, 247)'], [1, 'rgb(220, 220, 220)']],
          autocolorscale: true,
          reversescale: false,
          marker: {
            line: {
              color: 'rgb(180,180,180)',
              width: 0.5
            }
          },
          tick0: 0,
          zmin: 0,
          dtick: 1000,
          colorbar: {
            autotic: true ,
            title: '%<br>Probability'
          }
        }];

        var mapLayout = {
          title: '',
          geo: {
            showframe: true,
            projection: {
              type: 'robinson'
            }
          }
        };



        if (data.country.length > 0) {
          Plotly.setPlotConfig({ mapboxAccessToken: 'pk.eyJ1Ijoia2dsb2dpbnMiLCJhIjoiY2syajRoc3FyMDJhNTNjcXBlZG5jZ3R0biJ9.4vRwSoou5h5oq1Ur7zvR9Q' });

          Plotly.newPlot('info__nationality', mapData, mapLayout, { showLink: false });

          $('.info__nationality-list').html(nationalityList(data.country));
        } else {
          $('#info__nationality').html('Can\'t predict');
        }

      },
      complete: function () {
        $('.spinner-border').css('display', 'none');
      }
    });

    console.log(name);
  });
});

function hasSpaces(name) {
  return name.indexOf(' ') >= 0;
}

function hasNumber(name) {
  return /\d/.test(name);
}

function hasPunctuation(name) {
  return name.includes('.') 
    || name.includes(',')
    || name.includes('!')
    || name.includes('?');
}

function validateForm() {
  var status;
  status = true;
  $('.form__warn').remove();

  $('input').each(function () {
    if ($(this).val() === "") {
      var warn = '<div class="form__warn">Please fill this field</div>';
      $(this).after(warn);
      status = false;
    }

    if (hasSpaces($(this).val())) {
      var warn = '<div class="form__warn">Write one word (don\'t use spaces)</div>';
      $(this).after(warn);
      status = false;
    }

    if (hasNumber($(this).val())) {
      var warn = '<div class="form__warn">The word contains a number. Try again without numbers.</div>';
      $(this).after(warn);
      status = false;
    }

    if (hasPunctuation($(this).val())) {
      var warn = '<div class="form__warn">The word contains punctuation. Try again without them.</div>';
      $(this).after(warn);
      status = false;
    }
  })
  return status;
}

function unpack(rows, key) {
  return rows.map(function (row) {
    if (key == "probability") {
      return row[key] * 100;
    } else {
      return row[key];
    }
  });
}

function nationalityList(nationalities) {
  var list = '<p>Format: Country name (Alpha 3 code) - probability in percentage</p><ol>';

  for (nationality of nationalities) {
    list = list + `<li>${nationality.name} (${nationality.id}) - ${nationality.probability * 100}%</li>`;
  }

  list = list + '</ol>'

  return list
}