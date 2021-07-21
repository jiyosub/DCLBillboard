//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;

import "hardhat/console.sol";

contract DCLBillboard {
	string public name = "DCLBillboard";

	// Banners
	uint256 public bannerCount = 0;
	mapping(uint256 => Banner) public banners;

	struct Banner {
		uint256 id;
		string hash;
		string description;
		string clickThru;
		address payable owner;
	}
	event BannerCreated(Banner _banner);

	// Billboards
	uint256 public billboardCount = 0;
	mapping(uint256 => Billboard) public billboards;

	struct Billboard {
		uint256 id;
		string description;
		string parcel;
		string realm;
		uint256 rate;
		address payable owner;
	}
	event BillboardCreated(Billboard _billboard);

	// Flight - Represents an advertising run
	uint256 public flightCount = 0;
	mapping(uint256 => Flight) public flights;

	struct Flight {
		uint256 id;
		string description;
		uint256 bannerId;
		uint256 billboardId;
		uint256 rate;
		uint256 startDate;
		uint256 endDate;
	}

	event FlightCreated(Flight _flight);

	function createBanner(
		string memory _bannerHash,
		string memory _description,
		string memory _clickThru
	) public {
		require(bytes(_description).length > 0, "Description required");
		require(bytes(_bannerHash).length > 0, "BannerHash required");
		require(msg.sender != address(0x0), "Bad Sender");
		bannerCount++;

		Banner memory banner = Banner(
			bannerCount,
			_bannerHash,
			_description,
			_clickThru,
			payable(msg.sender)
		);
		banners[bannerCount] = banner;

		emit BannerCreated(banner);
	}

	function createBillboard(
		string memory _description,
		string memory _parcel,
		string memory _realm,
		uint256 _rate
	) public {
		require(bytes(_description).length > 0, "Description required");
		require(bytes(_parcel).length > 0, "Parcel required");
		require(bytes(_realm).length > 0, "Realm required");
		require(_rate > 0, "Rate required");
		require(msg.sender != address(0x0), "Bad Sender");
		billboardCount++;

		Billboard memory billBoard = Billboard(
			billboardCount,
			_description,
			_parcel,
			_realm,
			_rate,
			payable(msg.sender)
		);
		billboards[billboardCount] = billBoard;

		emit BillboardCreated(billBoard);
	}

	function createFlight(
		string memory _description,
		uint256 _bannerId,
		uint256 _billboardId,
		uint256 _rate,
		uint256 _startDate,
		uint256 _endDate
	) public {
		require(bytes(_description).length > 0, "Description required");
		require(_bannerId > 0, "BannerId required");
		require(_billboardId > 0, "BillboardId required");
		require(_rate > 0, "Rate required");
		require(_startDate > 0, "StartDate required");
		require(_endDate > 0, "EndDate required");
		flightCount++;

		Flight memory flight = Flight(
			flightCount,
			_description,
			_bannerId,
			_billboardId,
			_rate,
			_startDate,
			_endDate
		);
		flights[flightCount] = flight;

		emit FlightCreated(flight);
	}
}