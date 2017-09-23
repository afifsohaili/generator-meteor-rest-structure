import SimpleSchema from 'simpl-schema'
import moment from 'moment'

SimpleSchema.extendOptions(['autoform'])

export default new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  createdAt: {
    type: Date,
    autoform: {
      label: false,
      type: 'hidden'
    },
    autoValue: function() {
      if (this.isInsert) {
        return moment().toDate()
      }
    }
  },
  updatedAt: {
    type: Date,
    autoform: {
      label: false,
      type: 'hidden'
    },
    autoValue: function() {
      return moment().toDate()
    }
  }
})
