const Should = require('chai').Should()
const Linear = require('tween.js').Easing.Linear.None
const Transition = require('../lib/transition')
const {log,forEach} = require('../lib/funcs')

const assign = Object.assign

const transition = [
  {duration:1000},
  {delay:100,duration:1000,property:['x','y']},
  {delay:100,duration:1000,property:['all','alpha']},
  {duration:2000,property:'all'},
]

describe('transition',()=>{
  it('.toDefault should return',()=>{
    const standart = {delay:0,duration:0,property:['all'],easing:Linear}

    const expected = [
      assign({},standart,transition[0]),
      assign({},standart,transition[1]),
      assign({},standart,transition[2],{property:['all']}),
      assign({},standart,transition[3],{property:['all']}),
    ]

    Transition.toDefault(transition).should.be.deep.equal(expected)
  })

  it('.splitAll should return',()=>{
    const style = {x:0,y:0,opacity:1,transition:[
      {delay:100,duration:20,property:['all'],easing:Linear},
      {delay:10,duration:1000,property:['opacity'],easing:Linear},
      {delay:10,duration:1000,property:['alpha'],easing:Linear},
    ]}
    const expected = [
      {delay:10,duration:1000,property:'opacity',easing:Linear},
      {delay:100,duration:20,property:'y',easing:Linear},
      {delay:100,duration:20,property:'x',easing:Linear},
    ]

    Transition.splitAll(style).should.be.deep.equal(expected)
  })
})

describe('transition.private',()=>{
  const private = Transition.private

  const test = func=>e=>func(e.input).should.be.deep.equal(e.output)
  const tests = func=>expected=>forEach(test(func))(expected)

  const transitionOne = Transition.toDefault(transition)
  const transitionTwo = [
    {delay:0,duration:10,property:['x'],easing:Linear},
    {delay:0,duration:100,property:['y'],easing:Linear},
  ]

  it('.overrideAll should return',()=>{
    const expected = [
      {input:['all','nice'],output:['all']},
      {input:['x','y'],output:['x','y']}
    ]

    tests(private.overrideAll)(expected)
  })
})