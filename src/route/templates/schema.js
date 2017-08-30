import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['autoform'])

export default new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  }
})
