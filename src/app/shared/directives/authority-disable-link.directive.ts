import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from '@core/authentication/auth.service';
/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element [authorityDisableLink]="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element [authorityDisableLink]="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[authorityDisableLink]'
})
export class AuthorityDisableLinkDirective {
    private authorities: string[];

    constructor(private el: ElementRef,
         private auth: AuthService
    ) { }

    @Input()
    set authorityDisableLink(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [value] : value;
        this.updateView();
    }

    private updateView(): void {
        const classDisabled = this.auth.hasAnyAuthority(this.authorities) ? null : 'disabled' ;
        this.el.nativeElement.classList.add(classDisabled);
    }
}
