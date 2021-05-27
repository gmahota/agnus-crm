import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {DefaultSlider, RangeSlider} from '../components/sliders'
import {useSelector, shallowEqual} from 'react-redux'

const Index = () => {
  let {colors} = useSelector(
    (state) => ({
      colors: state.colors
    }),
    shallowEqual
  )
  colors = colors.filter(
    (color) => !['transparent', 'black', 'white'].includes(color)
  )
  return (
    <>
      <SectionTitle title="Forms" subtitle="Sliders" />
      <Widget
        title="Default slider"
        description={
          <span>
            Use the <code>DefaultSlider</code> component for a simple slider
          </span>
        }>
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-1/3">
            <DefaultSlider />
          </div>
        </div>
      </Widget>
      <Widget
        title="Range slider"
        description={
          <span>
            Use the <code>RangeSlider</code> component for range sliders
          </span>
        }>
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-1/3">
            <RangeSlider />
          </div>
        </div>
      </Widget>
      <Widget
        title="Slider colors"
        description={
          <span>Use the following classNames to change the slider styles</span>
        }>
        <div className="flex flex-col w-full">
          {colors.map((color, i) => (
            <div className="w-full lg:w-1/3 mb-4" key={i}>
              <div className="text-sm">
                <code>.slider-{color}</code>
              </div>
              <DefaultSlider className={`slider-${color}`} />
            </div>
          ))}
        </div>
      </Widget>
    </>
  )
}
export default Index
