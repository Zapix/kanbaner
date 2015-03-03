var Q = require( "q" );

var mockJquery = {
    ajax: jest.genMockFunction()
};

//var mockJquery = jest.genMockFromModule("jquery");

mockJquery.ajax.mockReturnValue(
  Q(
    {
      user: {
        id: 346813,
        login: "Zapix"
      }
    }
  )
);

module.exports = mockJquery;