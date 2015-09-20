var sock = new SockJS('localhost:3434/socket');

var pulses = {aleksanb: 20, sigve: 30};

sock.onopen = function() {
  console.log('open');
};

sock.onclose = function() {
  console.log('close');
};

sock.onmessage = function(event) {
  var data = JSON.parse(event.data);
  console.log(JSON.parse(event.data));

  React.render(
    <PulseHighscores pulses={data} />,
    document.body
  );
};

function yo(name, puls) {
  sock.send(JSON.stringify({type:'pulse', pulse: puls, username:name}));
}

var PulseHighscores = React.createClass({
  render: function() {
    function toLi(item) {
      return <li>{item.username}: {item.current} (max: {item.max}, avg: {item.average})</li>
    }

    return <ul>{this.props.pulses.map(toLi)}</ul>;
  }
});
