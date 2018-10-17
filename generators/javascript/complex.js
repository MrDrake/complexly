Blockly.JavaScript['complex_component'] = function(block) {
  var operator = block.getFieldValue('FUNCTION');
  var arg = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_ADDITION);
  switch (operator) {
    case 'REAL':
      code = 'math.re(' + arg + ')';
      break;
    case 'IMAG':
      code = 'math.im(' + arg + ')';
      break;
    case 'MOD':
      code = 'math.abs(' + arg + ')';
      break;
    case 'ARG':
      code = 'math.arg(' + arg + ')';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['complex_conjugate'] = function(block) {
  var value_target = Blockly.JavaScript.valueToCode(block, 'TARGET', Blockly.JavaScript.ORDER_ADDITION);
  var code = 'math.conj(' + value_target + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['complex_i'] = function(block) {
  var code = 'math.i';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['complex_literal'] = function(block) {
  var number_real = block.getFieldValue('REAL');
  var number_imag = block.getFieldValue('IMAG');
  var code = 'math.complex(' + number_real + ',' + number_imag + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['complex_euler'] = function(block) {
  var value_mod = Blockly.JavaScript.valueToCode(block, 'MOD', Blockly.JavaScript.ORDER_ADDITION);
  var value_arg = Blockly.JavaScript.valueToCode(block, 'ARG', Blockly.JavaScript.ORDER_ADDITION);
  var code = 'math.complex({r:' + value_mod + ',phi:' + value_arg + '})';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['complex_constructor'] = function(block) {
  var value_real = Blockly.JavaScript.valueToCode(block, 'REAL', Blockly.JavaScript.ORDER_ADDITION);
  var value_imag = Blockly.JavaScript.valueToCode(block, 'IMAG', Blockly.JavaScript.ORDER_ADDITION);
  var code = 'math.add(' + value_real + ',math.multiply(' + value_imag + ',math.i))';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['pi_fraction'] = function(block) {
  var value_num = Blockly.JavaScript.valueToCode(block, 'REAL', Blockly.JavaScript.ORDER_ATOMIC);
  var value_den = Blockly.JavaScript.valueToCode(block, 'IMAG', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'math.divide(math.multiply(' + value_num + ',math.pi),' + value_den + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};