Blockly.Blocks['complex_component'] = {
  init: function() {
    this.appendValueInput("TARGET")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([["real part","REAL"], ["imaginary part","IMAG"], ["modulus","MOD"], ["argument","ARG"]]), "FUNCTION")
        .appendField("of");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("Real components of complex number");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['complex_conjugate'] = {
  init: function() {
    this.appendValueInput("TARGET")
        .setCheck("Number")
        .appendField("conjugate of");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("Conjugate of complex number");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['complex_i'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("i");
    this.setOutput(true, "Number");
    this.setColour(65);
 this.setTooltip("Square root of -1");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['complex_literal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(-1), "REAL")
        .appendField("+")
        .appendField(new Blockly.FieldNumber(2), "IMAG")
        .appendField("i");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("Complex literal");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['complex_constructor'] = {
  init: function() {
    this.appendValueInput("REAL")
        .setCheck("Number");
    this.appendValueInput("IMAG")
        .setCheck("Number")
        .appendField("+");
    this.appendDummyInput()
        .appendField("i");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("Complex literal");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['complex_euler'] = {
  init: function() {
    this.appendValueInput("MOD")
        .setCheck("Number")
    this.appendValueInput("ARG")
        .setCheck("Number")
        .appendField("e^i");;
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("Complex literal");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['pi_fraction'] = {
  init: function() {
    this.appendValueInput("REAL")
        .setCheck("Number");
    this.appendValueInput("IMAG")
        .setCheck("Number")
        .appendField("π /");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("π fraction");
 this.setHelpUrl("");
  }
};