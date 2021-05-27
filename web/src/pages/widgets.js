import React, {useState} from 'react'
import SectionTitle from '../components/section-title'
import {BtnGroup, BtnCircle, BtnRounded} from '../components/widgets/buttons'
import {Badge} from '../components/badges'
import Dropdown1 from '../components/widgets/dropdown-1'
import Dropdown2 from '../components/widgets/dropdown-2'
import Checkboxes from '../components/lists/checkboxes'
import Radios from '../components/lists/radios'
import Switch from 'react-switch'
import {getColor} from '../functions/colors'

const SwitchComponent = ({initialState = false, color = 'blue'}) => {
  const [checked, handleChange] = useState(initialState)
  let onColor = `bg-${color}-100`
  let onHandleColor = `bg-${color}-500`
  let offColor = `bg-gray-200`
  let offHandleColor = 'bg-white'

  return (
    <Switch
      onChange={() => handleChange(!checked)}
      checked={checked}
      onColor={getColor(onColor)}
      onHandleColor={getColor(onHandleColor)}
      offColor={getColor(offColor)}
      offHandleColor={getColor(offHandleColor)}
      handleDiameter={24}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
      activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
      height={20}
      width={48}
      className="react-switch"
    />
  )
}

const Widget = ({title, description, right = null, children}) => {
  return (
    <div className="w-full p-4 mb-4 rounded-lg bg-white text-gray-900 border border-gray-100">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col">
          <div className="text-sm font-light text-gray-500">{title}</div>
          <div className="text-sm font-bold">{description}</div>
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

const Tabs = ({tabs, type = null}) => {
  const [openTab, setOpenTab] = useState(0)
  const items = [
    {
      title: 'First',
      onClick: () => {
        setOpenTab(0)
        console.log('click')
      }
    },
    {
      title: 'Second',
      onClick: () => {
        setOpenTab(1)
        console.log('click')
      }
    },
    {
      title: 'Third',
      onClick: () => {
        setOpenTab(2)
        console.log('click')
      }
    }
  ]
  return (
    <div className="flex flex-wrap flex-row space-x-1 tabs">
      {items.map((item, i) => (
        <div key={i} className="flex-none">
          <button
            onClick={item.onClick}
            className={`tab ${type} ${i === openTab ? 'tab-active' : ''}`}
            type="button">
            {item.title}
          </button>
        </div>
      ))}
    </div>
  )
}

const Index = () => {
  const items = [
    {
      title: 'Doloribus provident nostrum tempora tempore.',
      value: 0,
      checked: false
    },
    {
      title: 'Consectetur harum at expedita debitis.',
      value: 1,
      checked: false
    },
    {
      title: 'Non et aut minima maxime.',
      value: 2,
      checked: false
    },
    {
      title: 'Et explicabo culpa consequatur animi.',
      value: 3,
      checked: false
    },
    {
      title: 'Omnis laudantium voluptas provident ipsa.',
      value: 4,
      checked: false
    }
  ]
  return (
    <>
      <SectionTitle title="Pages" subtitle="Empty page" />
      <div className="flex w-full">
        <div className="w-1/3">
          <Checkboxes items={items} />
        </div>
        <div className="w-1/3">
          <Radios items={items} />
        </div>
      </div>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<Tabs />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<Tabs type="tab-pill" />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<Tabs type="tab-underline" />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<BtnGroup />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<BtnRounded />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<BtnCircle />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<Dropdown1 />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<Dropdown2 />}>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={
          <button
            onClick={() => console.log('click')}
            className="text-xs px-2 py-1 bg-transparent text-blue-500">
            View all
          </button>
        }>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={
          <Badge size="sm" rounded color="bg-yellow-100 text-yellow-600">
            18 tasks
          </Badge>
        }>
        <p>This is an empty page</p>
      </Widget>
      <Widget
        title="Widget title"
        description="Widget description"
        right={<SwitchComponent initialState={false} color={'blue'} />}>
        <p>This is an empty page</p>
      </Widget>
    </>
  )
}
export default Index
