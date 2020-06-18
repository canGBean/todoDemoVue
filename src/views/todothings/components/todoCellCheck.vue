<script>
export default {
  name: "todoCellCheck",
  functional: true,
  props: {
    itemsDataGroupByDate: {
      type: Object,
      default: null
    },
    cellDate: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { itemsDataGroupByDate, cellDate } = context.props;
    const vnodes = [];
    let status = 999;
    if (itemsDataGroupByDate !== null) {
      Object.keys(itemsDataGroupByDate).forEach(function(category) {
        if (category === cellDate) {
          status = itemsDataGroupByDate[category].reduce(
            (prev, currentValue) => {
              return prev + currentValue.status;
            },
            0
          );
          status === 0 && status !== 999
            ? // ? vnodes.push(<svg-icon icon-class="greenmark" />)
              vnodes.push("✔️")
            : vnodes.push(<svg-icon icon-class="redmark" />);
        }
      });
    }
    return vnodes;
  }
};
</script>
