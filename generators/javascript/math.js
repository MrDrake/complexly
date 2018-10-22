/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.math');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.JavaScript['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var operator = block.getFieldValue('OP');
  var order = Blockly.JavaScript.ORDER_MEMBER;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code;
  switch (operator) {
    case 'ADD':
      code = 'math.add(' + argument0 + ', ' + argument1 + ')';
      break;
    case 'MINUS':
      code = 'math.add(' + argument0 + ', ' + argument1 + ')';
      break;
    case 'MULTIPLY':
      code = 'math.multiply(' + argument0 + ', ' + argument1 + ')';
      break;
    case 'DIVIDE':
      code = 'math.divide(' + argument0 + ', ' + argument1 + ')';
      break;
    case 'POWER':
      code = 'math.pow(' + argument0 + ', ' + argument1 + ')';
      break;
  }
  return [code, order];
};

Blockly.JavaScript['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_NONE) || '0';
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'math.abs(' + arg + ')';
      break;
    case 'SIGN':
      code = 'math.sign(' + arg + ')';
      break;
  }
  if (code) {
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'NEG':
      code = 'math.unaryMinus(' + arg + ')';
      break;
    case 'ROOT':
      code = 'math.sqrt(' + arg + ')';
      break;
    case 'SQUARE':
      code = 'math.square(' + arg + ')';
      break;
    case 'CUBEROOT':
      code = 'math.cbrt(' + arg + ')';
      break;
    case 'CUBE':
      code = 'math.cube(' + arg + ')';
      break;
    case 'LN':
      code = 'math.log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'math.log10(' + arg + ')';
      break;  
    case 'LOG2':
      code = 'math.log2(' + arg + ')';
      break;  
    case 'EXP':
      code = 'math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'math.sin(' + arg + ')';
      break;
    case 'COS':
      code = 'math.cos(' + arg + ')';
      break;
    case 'TAN':
      code = 'math.tan(' + arg + ')';
      break;
    case 'ASIN':
      code = 'math.asin(' + arg + ')';
      break;
    case 'ACOS':
      code = 'math.acos(' + arg + ')';
      break;
    case 'ATAN':
      code = 'math.atan(' + arg + ')';
      break;
    default:
      throw Error('Unknown math operator: ' + operator);
  }
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['math.PI', Blockly.JavaScript.ORDER_MEMBER],
    'E': ['math.E', Blockly.JavaScript.ORDER_MEMBER],
    'GOLDEN_RATIO': ['math.phi', Blockly.JavaScript.ORDER_MEMBER],
    'SQRT2': ['math.SQRT2', Blockly.JavaScript.ORDER_MEMBER],
    'SQRT1_2': ['math.SQRT1_2', Blockly.JavaScript.ORDER_MEMBER],
    'INFINITY': ['Infinity', Blockly.JavaScript.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.JavaScript['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.JavaScript.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.JavaScript.ORDER_ADDITION) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  switch (dropdown_property) {
    case 'WHOLE':
      code = 'math.isInteger(' + number_to_check + ')';
      break;
    case 'POSITIVE':
      code = 'math.isPositive(' + number_to_check + ')';
      break;
    case 'NEGATIVE':
      code = 'math.isNegative(' + number_to_check + ')';
      break;
    case 'PRIME':
      code = 'math.isPrime(' + number_to_check + ')';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.JavaScript.valueToCode(block, 'DIVISOR',
          Blockly.JavaScript.ORDER_ADDITION) || '0';
      code = 'math.mod(' + number_to_check + ',' + divisor + ') == 0';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_EQUALITY];
};

Blockly.JavaScript['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'DELTA',
      Blockly.JavaScript.ORDER_ADDITION) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.JavaScript['math_round'] = Blockly.JavaScript['math_single'];
// Trigonometry functions have a single operand.
Blockly.JavaScript['math_trig'] = Blockly.JavaScript['math_single'];

Blockly.JavaScript['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.sum(' + list + ')';
      break;
    case 'PRODUCT':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.prod(' + list + ')';
      break;
    case 'MIN':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.min(' + list + ')';
      break;
    case 'MAX':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.max(' + list + ')';
      break;
    case 'MEAN':
      // mathMean([null,null,1,3]) == 2.0.
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.mean(' + list + ')';
      break;
    case 'MEDIAN':
      // mathMedian([null,null,1,3]) == 2.0.
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.median(' + list + ')';
      break;
    case 'MODE':
      // As a list of numbers can contain more than one mode,
      // the returned result is provided as an array.
      // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.mode(' + list + ')';
      break;
    case 'VARIANCE':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.var(' + list + ')';
      break;
    case 'STD_DEV':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.std(' + list + ')';
      break;
    case 'MAD':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.mad(' + list + ')';
      break;    
    case 'RANDOM':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = 'math.pickRandom(' + list + ')';
      break;
    default:
      throw Error('Unknown operator: ' + func);
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'DIVIDEND',
      Blockly.JavaScript.ORDER_MODULUS) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'DIVISOR',
      Blockly.JavaScript.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.JavaScript.ORDER_MODULUS];
};

Blockly.JavaScript['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'LOW',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(block, 'HIGH',
      Blockly.JavaScript.ORDER_COMMA) || 'Infinity';
  var code = 'math.min(math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var functionName = Blockly.JavaScript.provideFunction_(
      'mathRandomInt',
      ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
          '(a, b) {',
       '  if (a > b) {',
       '    // Swap a and b to ensure a is smaller.',
       '    var c = a;',
       '    a = b;',
       '    b = c;',
       '  }',
       '  return math.floor(math.random() * (b - a + 1) + a);',
       '}']);
  var code = functionName + '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['math.random()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
