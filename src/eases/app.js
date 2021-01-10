export default function () {

    return {

        mobileBreakPoint() {

            const style = window.getComputedStyle(document.documentElement);
            const breakPoint = style.getPropertyValue('--mobile-break');

            return parseInt(breakPoint, 10);
        },

        pageMaxWidth() {

            const style = window.getComputedStyle(document.documentElement);
            const breakPoint = style.getPropertyValue('--page-max-width');

            return parseInt(breakPoint, 10);
        }
    }
}