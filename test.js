import test from 'ava'
import r from './lib/renderer'
import path from 'path'
import fs from 'fs'

function escape (str) {
  return (Array.isArray(str) ? str[0] : str)
    .trim()
    .replace(/(^\s+)|(\s+$)|\r?\n|\r/gm, '')
}

test('basic', t => {
  const text = '<div>hello {{ name }}</div>'
  t.is(
    escape(
      r({text}, {name: 'byungi'})
    ),
    escape`
      <div>hello byungi</div>
    `)
})

test('partial', t => {
  const text = `
  <div>
    @include('partial')
  </div>
  `
  const partial = `<span>hello {{name}}</span>`
  fs.writeFileSync(path.resolve(__dirname, 'partial.edge'), partial)

  t.is(
    escape(
      r({text, path: __dirname}, {name: 'byungi'})
    ),
    escape`
      <div>
        <span>hello byungi</span>
      </div>
    `)
})

test.after('clean up', () => {
  fs.unlinkSync(path.resolve(__dirname, 'partial.edge'))
})
