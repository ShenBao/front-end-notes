

function PropsHOC(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}