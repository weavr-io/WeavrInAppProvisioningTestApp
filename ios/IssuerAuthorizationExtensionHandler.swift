//
//  AddToWalletButton.swift
//  WeavrInAppProvisioningTestApp
//
//  Created by Selva Chinnakalai on 29/08/2024.
//

import PassKit
import UIKit

@available(iOS 14.0, *)
class IssuerAuthorizationExtensionHandler: UIViewController, PKIssuerProvisioningExtensionAuthorizationProviding {
    var completionHandler: ((PKIssuerProvisioningExtensionAuthorizationResult) -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()
        // Set up view and authenticate user.
      self.authenticateUser()
    }

    func authenticateUser() {
        let userAuthenticated = true // User authentication outcome

        let authorizationResult: PKIssuerProvisioningExtensionAuthorizationResult = userAuthenticated ? .authorized : .canceled

        self.completionHandler?(authorizationResult)
    }
}
