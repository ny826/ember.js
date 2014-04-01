import Ember from "ember-metal/core"; // Ember.K
import run from "ember-metal/run_loop";
import QUnitAdapter from "ember-testing/adapters/qunit";

var adapter;

module("ember-testing QUnitAdapter", {
  setup: function() {
    adapter = new QUnitAdapter();
  },
  teardown: function() {
    run(adapter, adapter.destroy);
  }
});

test("asyncStart calls stop", function() {
  var originalStop = window.stop;
  try {
    window.stop = function(){
      ok(true, "stop called");
    };
    adapter.asyncStart();
  } finally {
    window.stop = originalStop;
  }
});

test("asyncEnd calls start", function() {
  var originalStart = window.start;
  try {
    window.start = function(){
      ok(true, "start called");
    };
    adapter.asyncEnd();
  } finally {
    window.start = originalStart;
  }
});

test("exception causes a failing assertion", function() {
  var error = {err: 'hai'}, originalOk = window.ok;
  try {
    window.ok = function(val, msg){
      originalOk(!val, "ok is called with false");
      originalOk(msg, '{err: "hai"}');
    };
    adapter.exception(error);
  } finally {
    window.ok = originalOk;
  }
});
